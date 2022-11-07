import { useState } from 'react';


type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((newValue: T) => void);

export interface TermsState {
	readonly value: boolean;
	readonly error: string;

	readonly setValue: Setter<boolean>;
	readonly setError: Setter<string>;

	readonly isError: () => boolean;
	readonly clearError: () => void;
}

export function useTermsState(): TermsState {
	const [value, setValue] = useState(false);
	const [error, setError] = useState('');

	return {
		value,
		error,

		setValue,
		setError,

		isError: () => error !== '',
		clearError: () => setError(''),
	};
}