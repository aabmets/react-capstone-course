/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import axios from 'axios';
import { all } from 'itertools';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDebouncedState } from '@mantine/hooks';
import { useAuthDatastoreContext } from '@auth/context';
import * as EmailValidator from 'email-validator';
import siteConfig from 'site.config';


interface ServerResponse extends AxiosResponse {
	data: {
		available: boolean;
	};
}

interface Validator {
	status: EmailStatus,
	validate: (value: string) => void,
}

export enum EmailStatus {
	TAKEN = 'TAKEN',
	AVAILABLE = 'AVAILABLE',
	WAITING = 'WAITING',
	PENDING = 'PENDING',
	NONE = 'NONE',
}

export function useEmailValidator(): Validator {
	const { maxEmailLength, maxLatencyMsec } = siteConfig.auth;
	const { inputDebounceMsec } = siteConfig.auth;

	const { email, network } = useAuthDatastoreContext();
	const [request, setRequest] = useDebouncedState(0, inputDebounceMsec);
	const [status, setStatus] = useState(EmailStatus.WAITING);
	const { t } = useTranslation('auth');

	function validate(value: string): void {
		if (value.length > maxEmailLength) {
			const message = t('auth.email-input.error.too-long');
			email.setError(message.replace('$', String(maxEmailLength)));
			if (network.isLatencyGood()) {
				setStatus(EmailStatus.WAITING);
			}
		} else {
			if (status !== EmailStatus.NONE) {
				if (EmailValidator.validate(value)) {
					if (network.isLatencyGood()) {
						setStatus(EmailStatus.PENDING);
						setRequest(Math.random());
					} else {
						setStatus(EmailStatus.NONE);
					}
				} else {
					setStatus(EmailStatus.WAITING);
				}
			}
			if (email.isError()) {
				email.clearError();
			}
		} 
		email.setValue(value);
	}

	
	useEffect(() => {
		if (network.isLatencyBad()) {
			setStatus(EmailStatus.NONE);
		}
	}, [network.getLatency()]);


	useEffect(() => {
		const allConditions = all([
			EmailValidator.validate(email.value),
			network.isLatencyGood(),
			!email.isError(),
		]);

		if (allConditions) {
			const request = {
				url: '/api/auth/check-email',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				timeout: maxLatencyMsec,
				data: { email: email.value },
			}
			axios(request)
				.then((res: ServerResponse) => {
					if (res.status === 200) {
						if (res.data.available) {
							setStatus(EmailStatus.AVAILABLE);
						} else {
							email.setError(t('auth.email-input.error.already-exists'));
							setStatus(EmailStatus.TAKEN);
						}
					} else {
						setStatus(EmailStatus.NONE);
					}
				})
				.catch(() => {
					network.setLatencyBad();
					setStatus(EmailStatus.NONE);
				});
		} 
	}, [request]);

	return { status, validate };
}