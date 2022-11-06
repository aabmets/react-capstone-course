import { useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';
import siteConfig from 'site.config';


type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((newValue: T) => void);
const NONE = '';

export interface PasswordState {
	readonly value: string;
	readonly score: number;
	readonly error: string;
	
	readonly setValue: Setter<string>;
	readonly setScore: Setter<number>;
	readonly setError: Setter<string>;

	readonly isError: () => boolean;
	readonly clearError: () => void;
}

export function usePasswordState(): PasswordState {
	const debounce = siteConfig.auth.passwordDebounceMsec;
	const [value, setValue] = useDebouncedState('', debounce);
	const [score, setScore] = useState(-1);
	const [error, setError] = useState('');

	return {
		value,
		score,
		error,

		setValue,
		setScore,
		setError,

		isError: () => error !== NONE,
		clearError: () => setError(NONE),
	};
}