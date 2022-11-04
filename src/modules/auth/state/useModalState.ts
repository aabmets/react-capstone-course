import { useState } from 'react';


export interface ModalState {
	readonly busy: boolean;
	readonly key: number;
	
	readonly isModalOpen: () => boolean;
	readonly isModalClosed: () => boolean;

	readonly openModal: () => void;
	readonly closeModal: () => void;

	readonly setBusy: (value: boolean) => void;
}

export function useModalState(): ModalState {
	const [busy, setBusy] = useState(false);
	const [key, setKey] = useState(0);

	return {
		busy,
		key,
		
		isModalOpen: () => Boolean(key),
		isModalClosed: () => !Boolean(key),

		openModal: () => setKey(Math.random()),
		closeModal: () => setKey(0),

		setBusy: (value: boolean) => setBusy(value),
	};
}