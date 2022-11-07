/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import axios from 'axios';
import { all } from 'itertools';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDatastoreContext } from '@auth/context';
import * as EmailValidator from 'email-validator';
import siteConfig from 'site.config';


interface ServerResponse extends AxiosResponse {
	data: {
		available: boolean;
	};
}
interface Indicator {
	status: EmailStatus,
	refresh: (value: string) => void,
}
export enum EmailStatus {
	TAKEN = 'TAKEN',
	AVAILABLE = 'AVAILABLE',
	WAITING = 'WAITING',
	PENDING = 'PENDING',
	NONE = 'NONE',
}

export function useEmailValidator(): Indicator {
	const { email, network } = useDatastoreContext();
	const [status, setStatus] = useState(EmailStatus.WAITING);
	const { auth } = siteConfig;

	function isNetworkRequest(value?: string): boolean {
		return all([
			EmailValidator.validate(value ?? email.value),
			network.isLatencyGood(),
			!email.isError(),
		])
	}
	
	function refresh(value: string): void {
		if (isNetworkRequest(value)) {
			setStatus(EmailStatus.PENDING);
		} else if (network.isLatencyGood()) {
			setStatus(EmailStatus.WAITING);
		} else {
			setStatus(EmailStatus.NONE);
		}
	}

	useEffect(() => {
		if (network.isLatencyBad()) {
			setStatus(EmailStatus.NONE);
		}
	}, [network.getLatency()]);

	useEffect(() => {
		if (isNetworkRequest()) {
			const request = {
				url: '/api/check-email',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				timeout: auth.maxLatencyMsec,
				data: { email: email.value },
			}
			axios(request)
				.then((res: ServerResponse) => {
					if (res.status === 200) {
						if (res.data.available) {
							setStatus(EmailStatus.AVAILABLE);
						} else {
							email.setError('auth.email-input.error.already-exists');
							setStatus(EmailStatus.TAKEN);
						}
					}
				})
				.catch(() => {
					network.setLatencyBad();
					setStatus(EmailStatus.NONE);
				});
		} 
	}, [email.value]);

	return { status, refresh };
}