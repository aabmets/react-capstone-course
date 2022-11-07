/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import axios from 'axios';
import { all } from 'itertools';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useDatastoreContext } from '@auth/context';
import siteConfig from 'site.config';


interface ServerResponse extends AxiosResponse {
	data: {
		score: PasswordScore;
	}
}
export enum PasswordScore {
	DISABLED = -2,
	NONE = -1,
	LEVEL0 = 0,
	LEVEL1 = 1,
	LEVEL2 = 2,
	LEVEL3 = 3,
	LEVEL4 = 4,
}

export function usePasswordValidator(): number {
	const { email, password, network } = useDatastoreContext();
	const [token, setToken] = useState(0);
	const { auth } = siteConfig;

	function isNetworkRequest() {
		return all([
			password.value !== '',
			network.isLatencyGood(),
			!password.isError(),
		])
	}

	useEffect(() => {
		if (network.isLatencyBad()) {
			password.setScore(PasswordScore.DISABLED);
		}
	}, [network.getLatency()]);

	useEffect(() => {
		if (isNetworkRequest()) {
			const request = {
				url: '/api/check-password',
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
			password.setScore(PasswordScore.NONE);
		}
	}, [password.value]);

	return token;
}