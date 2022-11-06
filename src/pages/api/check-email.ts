import type { NextApiRequest, NextApiResponse } from 'next';


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

	if (true) {
		const available = true;
		res.status(200).json({ available });
		return;
	}
	// res.status(400).json({error: 'Bad Request'});
	// return;
}

export default checkEmail;