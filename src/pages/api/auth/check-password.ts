import type { NextApiRequest, NextApiResponse } from 'next';
import { getPasswordScore } from '@auth/server';


interface ExtendedRequest extends NextApiRequest {
	body: {
		email?: string;
		password?: string;
	}
}

async function checkPassword(req: ExtendedRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method Not Allowed' });
		return;
	}

	const { email, password } = req.body;

	if (password !== undefined && email !== undefined) {
		const score = getPasswordScore(password, email);
		res.status(200).json({ score });
	} else {
		res.status(400).json({ error: 'Bad Request' });
	}
}

export default checkPassword;