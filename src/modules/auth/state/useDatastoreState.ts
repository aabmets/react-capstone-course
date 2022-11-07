import { useDebouncedState } from '@mantine/hooks';


export interface DatastoreState {
	key: number;
	reset: () => void;
}

export function useDatastoreState(delay?: number): DatastoreState {
	const [key, setKey] = useDebouncedState(0, delay || 100);

	function reset() {
		setKey(Math.random());
	}

	return { key, reset };
}