import React from 'react';
import { FormState, useFormState } from '../state';
import { EmailState, useEmailState } from '../state';
import { PasswordState, usePasswordState } from '../state';
import { TermsState, useTermsState } from '../state';


interface FormDataStore {
	form: FormState; 
	email: EmailState;
	password: PasswordState;
	terms: TermsState;
}

type Props = { children?: JSX.Element | JSX.Element[] };
type Context = FormDataStore | undefined;

export const FormDataContext = React.createContext<Context>(undefined);

export function FormDataProvider({ children }: Props): JSX.Element {
	const store: FormDataStore = {
		form: useFormState(),
		email: useEmailState(),
		password: usePasswordState(),
		terms: useTermsState(),
	}
	return (
		<FormDataContext.Provider value={store}>
			{children}
		</FormDataContext.Provider>
	);
}

export function useFormDataContext(): FormDataStore {
	const context = React.useContext(FormDataContext);  
	if (context === undefined) {
		throw new Error(
			'The \'useFormDataContext\' hook can only be ' +
			'used within a \'FormDataProvider\' context.'
		)
	} else {
		return context;
	}
}