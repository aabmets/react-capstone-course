import { useState } from 'react';


type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((newValue: T) => void);

export interface PasswordState {
	readonly value: string;
	readonly score: PasswordScore;
	readonly error: string;
	
	readonly setValue: Setter<string>;
	readonly setScore: Setter<PasswordScore>;
	readonly setError: Setter<string>;

	readonly isError: () => boolean;
	readonly clearError: () => void;
}

export enum PasswordScore {
	DISABLED = -2,
	EMPTY = -1,
	LEVEL0 = 0,
	LEVEL1 = 1,
	LEVEL2 = 2,
	LEVEL3 = 3,
	LEVEL4 = 4,
}

export function usePasswordState(): PasswordState {
	const [score, setScore] = useState(PasswordScore.EMPTY);
	const [value, setValue] = useState('');
	const [error, setError] = useState('');

	return {
		value,
		score,
		error,

		setValue,
		setScore,
		setError,

		isError: () => error !== '',
		clearError: () => setError(''),
	};
}