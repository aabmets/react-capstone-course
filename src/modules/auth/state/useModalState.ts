import { useState } from 'react';


export interface ModalState {
	isOpened: () => boolean,
	isClosed: () => boolean,

	open: () => void,
	close: () => void,

	isBusy: () => boolean,
	isIdle: () => boolean,
	
	setBusy: () => void,
	setIdle: () => void,
}

export function useModalState(): ModalState {
	const [opened, setOpened] = useState(false);
	const [busy, setBusy] = useState(false);

	return {
		isOpened: () => opened,
		isClosed: () => !opened,

		open: () => setOpened(true),
		close: () => setOpened(false),

		isBusy: () => busy,
		isIdle: () => !busy,

		setBusy: () => setBusy(true),
		setIdle: () => setBusy(false),
	};
}