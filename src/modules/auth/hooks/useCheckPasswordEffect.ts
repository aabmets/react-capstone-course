/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useFormDataContext } from '@auth/context';


interface ServerResponse extends AxiosResponse {
	data: {
		score: number;
	}
}
interface Status {
	token: number;
	regenToken: () => void;
}

function useCheckPasswordEffect(): Status {
	const { email, password } = useFormDataContext();
	const [token, setToken] = useState(0);

	const regenToken = () => setToken(Math.random());

	const data = { 
		password: password.value,
		email: email.value, 
	};

	useEffect(() => {
		if (password.value !== '') {
			axios.post('/api/check-password', data)
				.then((res: ServerResponse) => {
					const score = res.data.score;
					password.setScore(score);
					regenToken();
				}) 
				.catch(() => password.setScore(-1));
		} else if (password.score !== -1) {
			password.setScore(-1);
		}
	}, [password.value]);

	useEffect(() => {
		if (password.value !== '') {
			axios.post('/api/check-password', data)
				.then((res: ServerResponse) => {
					const score = res.data.score;
					if (score !== password.score) {
						password.setScore(score);
						regenToken();
					}
				}) 
				.catch(() => password.setScore(-1));
		} else if (password.score !== -1) {
			password.setScore(-1);
		}
	}, [email.value]);

	return { token, regenToken };
}

export default useCheckPasswordEffect;