/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useFormDataContext } from '@auth/context';
import * as EmailValidator from 'email-validator';


interface ServerResponse extends AxiosResponse {
	data: {
		available: boolean;
	};
}
interface Status {
	status: State;
	setPending: () => void;
}
enum State {
	PENDING = 'PENDING', 
	INVALID = 'INVALID', 
	VALID = 'VALID',
	NONE = 'NONE', 
};

function useCheckEmailEffect(): Status {
	const { email } = useFormDataContext();
	const [status, setStatus] = useState(State.NONE);

	const setPending = () => setStatus(State.PENDING);

	useEffect(() => {
		if (EmailValidator.validate(email.value)) {
			const data = { email: email.value };
			axios.post('/api/check-email', data)
				.then((res: ServerResponse) => {
					if (res.data.available) {
						setStatus(State.VALID);
					} else {
						email.setError('auth.email-input.error.already-exists');
						setStatus(State.INVALID);
					}
				})
				.catch(() => setStatus(State.NONE));
			return;
		} else if (status !== State.NONE) {
			setStatus(State.NONE);
		}
	}, [email.value]);

	return { status, setPending };
}

export default useCheckEmailEffect;