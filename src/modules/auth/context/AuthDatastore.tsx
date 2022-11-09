/* eslint-disable react-hooks/exhaustive-deps */
/* warning disabled for special case of useEffect */

import React from 'react';
import { useEffect } from 'react';
import * as state from '../state';


interface AuthDatastore {
	network: state.NetworkState,
	password: state.PasswordState;
	email: state.EmailState;
	terms: state.TermsState;
	form: state.FormState; 
}

interface Props {
	children: JSX.Element | JSX.Element[];
	persist: { form: state.FormState };
}

type Context = AuthDatastore | undefined;

export const AuthDatastoreContext = React.createContext<Context>(undefined);

export function AuthDatastoreProvider({ children, persist }: Props): JSX.Element {
	const datastore: AuthDatastore = {
		network: state.useNetworkState(),
		password: state.usePasswordState(),
		email: state.useEmailState(),
		terms: state.useTermsState(),
		form: persist.form,
	};
	
	const opened = persist.form.isOpened();
	const testLatency = datastore.network.testLatency;

	useEffect(() => {
		opened ? testLatency() : null;
	}, [opened]);

	return (
		<AuthDatastoreContext.Provider value={datastore}>
			{children}
		</AuthDatastoreContext.Provider>
	);
}

export function useAuthDatastoreContext(): AuthDatastore {
	const datastore = React.useContext(AuthDatastoreContext);
	if (datastore === undefined) {
		throw new Error(
			'The \'useDatastoreContext\' hook can only be ' +
			'used within a \'DatastoreProvider\' context.'
		);
	} else {
		return datastore;
	}
}