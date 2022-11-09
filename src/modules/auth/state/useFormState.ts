import { useState } from 'react';
import siteConfig from 'site.config';


const resetDelay = siteConfig.auth.formResetTimeoutMsec;

enum State {INPUT, SUCCESS, FAILED};

export interface FormState {
	readonly isInput: () => boolean;
	readonly isSuccess: () => boolean;
	readonly isFailed: () => boolean;

	readonly setInput: () => void;
	readonly setSuccess: () => void;
	readonly setFailed: () => void;

	readonly isBusy: () => boolean,
	readonly isIdle: () => boolean,
	readonly isOpened: () => boolean,
	readonly isClosed: () => boolean,

	readonly setBusy: () => void,
	readonly setIdle: () => void,
	readonly setOpened: () => void,
	readonly setClosed: () => void,
	
	readonly resetForm: () => void;
	readonly resetKey: number;
}

export function useFormState(): FormState {
	const [formState, setFormState] = useState(State.INPUT);
	const [resetKey, setResetKey] = useState(0);
	const [opened, setOpened] = useState(false);
	const [busy, setBusy] = useState(false);

	function resetForm() {
		setTimeout(() => {
			setFormState(State.INPUT);
			setResetKey(Math.random());
		}, resetDelay);
		setOpened(false);
		setBusy(false);
	}

	return {
		isInput: () => formState === State.INPUT,
		isSuccess: () => formState === State.SUCCESS,
		isFailed: () => formState === State.FAILED,

		setInput: () => setFormState(State.INPUT),
		setSuccess: () => setFormState(State.SUCCESS),
		setFailed: () => setFormState(State.FAILED),
		
		isBusy: () => busy,
		isIdle: () => !busy,
		isOpened: () => opened,
		isClosed: () => !opened,

		setBusy: () => setBusy(true),
		setIdle: () => setBusy(false),
		setOpened: () => setOpened(true),
		setClosed: () => setOpened(false),
		
		resetForm,
		resetKey,
	};
}