import { useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';
import siteConfig from 'site.config';


type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((newValue: T) => void);

export interface EmailState {
	readonly value: string;
	readonly error: string;
	
	readonly setValue: Setter<string>;
	readonly setError: Setter<string>;

	readonly isError: () => boolean;
	readonly clearError: () => void;
}

export function useEmailState(): EmailState {
	const debounce = siteConfig.auth.emailDebounceMsec;
	const [value, setValue] = useDebouncedState('', debounce);
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