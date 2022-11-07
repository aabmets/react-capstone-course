import sdk, { Query, AppwriteException } from 'node-appwrite';
import appwriteConfig from 'appwrite.config';


const client = new sdk.Client();
const users = new sdk.Users(client);
client
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectID)
    .setKey(process.env.API_KEY_USERS_ADMIN || '');


type Exception = AppwriteException | object;

interface Response {
	available: boolean;
	exception: Exception;
}

async function getEmailAvailability(email: string): Promise<Response> {
	const response = { available: false, exception: {} };
	try {
		const query = [Query.equal('email', email)];
		const result = await users.list(query);

		if (result.total === 0) {
			response.available = true;
		}
	} catch (ex) {
		response.exception = ex as Exception;
	}
	return response;
}

export default getEmailAvailability;