import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailState, PasswordState, TermsState } from '@auth/state'; 


interface ExtendedRequest extends NextApiRequest {
	body: {
		[key: string]: any;
		email?: EmailState;
		password?: PasswordState;
		terms?: TermsState;
	}
}

async function createUser(req: ExtendedRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'POST') {
		res.status(405).json({error: 'Method Not Allowed'});
		return;
	}
	if (true) {
		const data = { message: 'OK', username: '', password: ''}
		res.status(200).json(data);
		return;
	}
	// res.status(400).json({error: 'Bad Request'});
	// return;
}

export default createUser;