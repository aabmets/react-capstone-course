/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import React from 'react';
import { useRef, useEffect } from 'react';
import * as state from '../state';


interface FormDataStore {
	form: state.FormState; 
	email: state.EmailState;
	password: state.PasswordState;
	terms: state.TermsState;
	network: state.NetworkState;
}

type Context = FormDataStore | undefined;

export const FormDataContext = React.createContext<Context>(undefined);

export function FormDataProvider({ children }: any): JSX.Element {
	const keyRef = useRef(children.props.modal.key as number);

	useEffect(() => {
		store.network.testLatency();
	}, [keyRef]);

	const store: FormDataStore = {
		form: state.useFormState(),
		email: state.useEmailState(),
		password: state.usePasswordState(),
		terms: state.useTermsState(),
		network: state.useNetworkState(),
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