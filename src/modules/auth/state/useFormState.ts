import { useState } from 'react';


enum State {INPUT, SUCCESS, FAILED};

export interface FormState {
	readonly isInput: () => boolean;
	readonly isSuccess: () => boolean;
	readonly isFailed: () => boolean;

	readonly setInput: () => void;
	readonly setSuccess: () => void;
	readonly setFailed: () => void;
}

export function useFormState(): FormState {
	const [formState, setFormState] = useState(State.INPUT);

	return {
		isInput: () => formState === State.INPUT,
		isSuccess: () => formState === State.SUCCESS,
		isFailed: () => formState === State.FAILED,

		setInput: () => setFormState(State.INPUT),
		setSuccess: () => setFormState(State.SUCCESS),
		setFailed: () => setFormState(State.FAILED),
	};
}