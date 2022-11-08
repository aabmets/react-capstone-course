import type { NextApiRequest, NextApiResponse } from 'next';
import * as EmailValidator from 'email-validator';
import { getEmailAvailability } from '@auth/server';


interface ExtendedRequest extends NextApiRequest {
	body: {
		email?: string;
	}
}

async function checkEmail(req: ExtendedRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method Not Allowed' });
		return;
	}
	
	const { email } = req.body;

	if (email !== undefined && EmailValidator.validate(email)) {
		const result = await getEmailAvailability(email);
		if (Object.hasOwn(result, 'exception')) {
			res.status(500).json(result);
		} else {
			res.status(200).json(result);
		}
	} else {
		res.status(400).json({ error: 'Bad Request' });
	}
}

export default checkEmail;