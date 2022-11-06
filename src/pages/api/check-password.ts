import type { NextApiRequest, NextApiResponse } from 'next';
import { getPasswordScore } from '@server';


interface ExtendedRequest extends NextApiRequest {
	body: {
		password?: string;
		email?: string;
	}
}

async function checkPassword(req: ExtendedRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'POST') {
		res.status(405).json({error: 'Method Not Allowed'});
		return;
	}
	const { password, email } = req.body;
	if (password !== undefined && email !== undefined) {
		const score = getPasswordScore(password, email);
		res.status(200).json({ score });
		return;
	}
	res.status(400).json({error: 'Bad Request'});
	return;
}

export default checkPassword;