import React from 'react';
import config from 'appwrite.config';
import * as appwrite from 'appwrite';


interface Children {
	children: JSX.Element | JSX.Element[];
}

export interface Appwrite {
	client: appwrite.Client,
	account: appwrite.Account,
	teams: appwrite.Teams,
	databases: appwrite.Databases,
	storage: appwrite.Storage,
	functions: appwrite.Functions,
	locale: appwrite.Locale,
	avatars: appwrite.Avatars
}

export const AppwriteContext = React.createContext<Appwrite | undefined>(undefined);

export function AppwriteProvider({ children }: Children): JSX.Element {
	const { apiEndpoint, projectID } = config;
	const client = new appwrite.Client();
	client
		.setEndpoint(apiEndpoint)
		.setProject(projectID)

	const datastore = {
		account: new appwrite.Account(client),
		teams: new appwrite.Teams(client),
		databases: new appwrite.Databases(client),
		storage: new appwrite.Storage(client),
		functions: new appwrite.Functions(client),
		locale: new appwrite.Locale(client),
		avatars: new appwrite.Avatars(client),
		client,
	};

	return (
		<AppwriteContext.Provider value={datastore}>
			{children}
		</AppwriteContext.Provider>
	);
}

export function useAppwriteContext(): Appwrite {
	const datastore = React.useContext(AppwriteContext);
	if (datastore === undefined) {
		throw new Error(
			'The \'useAppwrite\' hook can only be used ' +
			'from within an \'AppwriteProvider\' context.'
		)
	} else {
		return datastore;
	}
}