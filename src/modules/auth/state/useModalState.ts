import { useState } from 'react';


export interface ModalState {
	readonly busy: boolean;
	readonly key: number;
	
	readonly isOpen: () => boolean;
	readonly isClosed: () => boolean;

	readonly open: () => void;
	readonly close: () => void;

	readonly setBusy: (value: boolean) => void;
}

export function useModalState(): ModalState {
	const [busy, setBusy] = useState(false);
	const [key, setKey] = useState(0);

	return {
		busy,
		key,

		isOpen: () => Boolean(key),
		isClosed: () => !Boolean(key),

		open: () => setKey(Math.random()),
		close: () => setKey(0),

		setBusy: (value: boolean) => setBusy(value),
	};
}