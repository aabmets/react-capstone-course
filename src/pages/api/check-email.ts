import type { NextApiRequest, NextApiResponse } from 'next';
import { getEmailAvailability } from '@server';


interface ExtendedRequest extends NextApiRequest {
	body: {
		email?: string;
	}
}

async function checkEmail(req: ExtendedRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'POST') {
		res.status(405).json({error: 'Method Not Allowed'});
		return;
	}
	const result = await getEmailAvailability(req.body.email || '');
	console.log(result);
	if (true) {
		res.status(200).json(result);
		return;
	}
	// res.status(400).json({error: 'Bad Request'});
	// return;
}

export default checkEmail;