import appwriteConfig from 'appwrite.config';
import * as appwrite from 'appwrite';


export interface ObjectStoreType {
	client: appwrite.Client,
	account: appwrite.Account,
	teams: appwrite.Teams,
	databases: appwrite.Databases,
	storage: appwrite.Storage,
	functions: appwrite.Functions,
	locale: appwrite.Locale,
	avatars: appwrite.Avatars
}

export const appwriteStore = (() => {
	const { api_endpoint, project_id } = appwriteConfig;
	const client = new appwrite.Client();
	client
		.setEndpoint(api_endpoint)
		.setProject(project_id)

	return {
		client,
		account: new appwrite.Account(client),
		teams: new appwrite.Teams(client),
		databases: new appwrite.Databases(client),
		storage: new appwrite.Storage(client),
		functions: new appwrite.Functions(client),
		locale: new appwrite.Locale(client),
		avatars: new appwrite.Avatars(client)
	};
})();