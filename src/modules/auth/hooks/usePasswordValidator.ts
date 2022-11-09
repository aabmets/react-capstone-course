/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import axios from 'axios';
import { all } from 'itertools';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useDebouncedState } from '@mantine/hooks';
import { useAuthDatastoreContext } from '@auth/context';
import { PasswordScore } from '@auth/state';
import siteConfig from 'site.config';


interface ServerResponse extends AxiosResponse {
	data: {
		score: PasswordScore;
	};
}

interface Validator {
	token: number,
	validate: (value: string) => void,
}

export function usePasswordValidator(): Validator {
	const { maxPasswordLength, minPasswordLength} = siteConfig.auth;
	const { inputDebounceMsec, maxLatencyMsec} = siteConfig.auth;

	const { email, password, network } = useAuthDatastoreContext();
	const [request, setRequest] = useDebouncedState(0, inputDebounceMsec);
	const [token, setToken] = useState(0);
	const { t } = useTranslation('auth');

	function validate(value: string): void {
		if (value.length > maxPasswordLength) {
			const message = t('auth.password-input.error.too-long');
			password.setError(message.replace('$', String(maxPasswordLength)));
		} else if (password.isError()) {
			password.clearError();
		} 
		password.setValue(value);
		setRequest(Math.random());
	}


	useEffect(() => {
		if (network.isLatencyBad()) {
			password.setScore(PasswordScore.DISABLED);
		}
	}, [network.getLatency()]);


	useEffect(() => {
		const allConditions1 = all([
			password.value !== '',
			password.value.length < minPasswordLength,
		])

		if (allConditions1) {
			password.setScore(PasswordScore.LEVEL0);
			setToken(Math.random());
			return;
		}

		const allConditions2 = all([
			password.value !== '',
			network.isLatencyGood(),
			!password.isError(),
		]);

		if (allConditions2) {
			const request = {
				url: '/api/auth/check-password',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				timeout: maxLatencyMsec,
				data: {
					password: password.value,
					email: email.value,
				},
			};
			axios(request)
				.then((res: ServerResponse) => {
					if (res.status === 200) {
						const score = res.data.score;
						password.setScore(score);
						setToken(Math.random());
					}
				}) 
				.catch(() => {
					network.setLatencyBad();
					password.setScore(PasswordScore.DISABLED);
				});
		} else if (network.isLatencyGood()) {
			password.setScore(PasswordScore.EMPTY);
		}
	}, [request]);

	return { token, validate };
}