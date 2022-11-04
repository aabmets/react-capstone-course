const zxcvbn = require('zxcvbn') as Zxcvbn;

type Zxcvbn = (password: string, user_input: string[]) => {
	[key: string]: any;
	score: number;
}

function getPasswordScore(password: string, email: string): number {
	return zxcvbn(password, [email]).score;
}

export default getPasswordScore;