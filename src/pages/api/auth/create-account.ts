import type { NextApiRequest, NextApiResponse } from 'next';
import sdk, { AppwriteException } from 'node-appwrite';
import * as EmailValidator from 'email-validator';
import { getEmailAvailability } from '@auth/server';
import { getPasswordScore } from '@auth/server';
import { PasswordScore } from '@auth/state';
import appwriteConfig from 'appwrite.config';


const client = new sdk.Client();
const users = new sdk.Users(client);
client
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectID)
    .setKey(process.env.API_KEY_USERS_ADMIN || '');


interface ExtendedRequest extends NextApiRequest {
	body: {
		email?: string;
		password?: string;
		terms?: boolean;
	}
}

interface Response {
	message: string,
	username: string;
	exception?: AppwriteException;
}

async function createAccount(req: ExtendedRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method Not Allowed' });
		return;
	}

	const { email, password, terms } = req.body;

	let isInvalid = false;

	if (!email || !password || !terms) {
		isInvalid = true;
	} else if (!EmailValidator.validate(email)) {
		isInvalid = true;
	} else if (password === email) {
		isInvalid = true;
	} else if (password.includes(' ')) {
		isInvalid = true;
	} else {
		const passwordScore = getPasswordScore(password, email);
		const emailResult = await getEmailAvailability(email);
		if (passwordScore <= PasswordScore.LEVEL2) {
			isInvalid = true;
		} else if (!emailResult.available) {
			isInvalid = true;
		}
	}

	if (isInvalid) {
		res.status(400).json({ error: 'Bad Request' });
		return;
	}

	const response: Response = { 
		message: 'ERROR', 
		username: '',
	}

	try {
		const result = await users.create('unique()', email, undefined, password, undefined);
		response.username = result.email;
		response.message = 'OK';
	} catch (ex) {
		response.exception = ex as AppwriteException;
	}

	if (Object.hasOwn(response, 'exception')) {
		res.status(500).json(response);
	} else {
		res.status(200).json(response);
	}
}

export default createAccount;