import React from 'react';
import { ObjectStoreType, appwriteStore } from './Appwrite.store';


export interface Children {
	children: JSX.Element | JSX.Element[];
}

export const AppwriteContext = React.createContext<ObjectStoreType>(appwriteStore);

export function AppwriteProvider({ children }: Children): JSX.Element {
	return (
		<AppwriteContext.Provider value={appwriteStore}>
			{children}
		</AppwriteContext.Provider>
	);
}

export function useAppwrite(): ObjectStoreType {
	const context = React.useContext(AppwriteContext);
	if (context === undefined) {
		throw new Error(
			'The \'useAppwrite\' hook can only be used ' +
			'from within an \'AppwriteProvider\' context.'
		)
	} else {
		return context;
	}
}