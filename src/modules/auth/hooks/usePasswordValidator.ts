/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import axios from 'axios';
import { all } from 'itertools';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useDatastoreContext } from '@auth/context';
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
	const { email, password, network } = useDatastoreContext();
	const [token, setToken] = useState(0);
	const { t } = useTranslation('auth');
	const { auth } = siteConfig;

	function validate(value: string): void {
		const maxLen = auth.maxPasswordLength;
		if (value.length > maxLen) {
			const msg = t('auth.password-input.error.too-long');
			password.setError(msg.replace('$', String(maxLen)));
		} else if (password.isError()) {
			password.clearError();
		} 
		password.setValue(value);
	}

	useEffect(() => {
		if (network.isLatencyBad()) {
			password.setScore(PasswordScore.DISABLED);
		}
	}, [network.getLatency()]);


	useEffect(() => {
		const allConditions = all([
			password.value !== '',
			network.isLatencyGood(),
			!password.isError(),
		]);

		if (allConditions) {
			const request = {
				url: '/api/auth/check-password',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				timeout: auth.maxLatencyMsec,
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
	}, [password.value]);

	return { token, validate };
}