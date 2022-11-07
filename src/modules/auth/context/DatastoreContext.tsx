import React from 'react';
import * as state from '../state';


interface Datastore {
	form: state.FormState; 
	email: state.EmailState;
	password: state.PasswordState;
	terms: state.TermsState;

	datastore: state.DatastoreState,
	network: state.NetworkState,
	modal: state.ModalState,
}

interface Props {
	children: JSX.Element | JSX.Element[];
	persist: {
		datastore: state.DatastoreState;
		network: state.NetworkState;
		modal: state.ModalState;
	}
}

type Context = Datastore | undefined;

export const DatastoreContext = React.createContext<Context>(undefined);

export function DatastoreProvider({ children, persist }: Props): JSX.Element {
	const datastore: Datastore = {
		form: state.useFormState(),
		email: state.useEmailState(),
		password: state.usePasswordState(),
		terms: state.useTermsState(),
		
		datastore: persist.datastore,
		network: persist.network,
		modal: persist.modal,
	}
	return (
		<DatastoreContext.Provider value={datastore}>
			{children}
		</DatastoreContext.Provider>
	);
}

export function useDatastoreContext(): Datastore {
	const datastore = React.useContext(DatastoreContext);
	if (datastore === undefined) {
		throw new Error(
			'The \'useDatastoreContext\' hook can only be ' +
			'used within a \'DatastoreProvider\' context.'
		);
	} else {
		return datastore;
	}
}