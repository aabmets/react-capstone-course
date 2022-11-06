import type { NextApiRequest, NextApiResponse } from 'next';


async function testNetworkLatency(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== 'GET') {
		res.status(405).json({error: 'Method Not Allowed'});
		return;
	}
	res.status(200).json({ serverTime: Date.now() });
	return;
}

export default testNetworkLatency;