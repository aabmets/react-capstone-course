import { PasswordScore } from '@auth/state';

type Zxcvbn = (password: string, user_input: string[]) => {
	[key: string]: any;
	score: number;
}

const zxcvbn = require('zxcvbn') as Zxcvbn;

function getPasswordScore(password: string, email: string): PasswordScore {
	return zxcvbn(password, [email]).score;
}

export default getPasswordScore;