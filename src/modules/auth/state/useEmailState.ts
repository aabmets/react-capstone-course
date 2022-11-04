import { useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';
import siteConfig from 'site.config';


type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((newValue: T) => void);
const NONE = '';

export interface EmailState {
	readonly value: string;
	readonly error: string;
	
	readonly setValue: Setter<string>;
	readonly setError: Setter<string>;

	readonly isError: () => boolean;
	readonly clearError: () => void;
}

export function useEmailState(): EmailState {
	const debounce = siteConfig.auth.email_debounce_ms;
	const [value, setValue] = useDebouncedState('', debounce);
	const [error, setError] = useState('');
	
	return {
		value, 
		error,

		setValue,
		setError,
		
		isError: () => error !== NONE,
		clearError: () => setError(NONE),
	};
}