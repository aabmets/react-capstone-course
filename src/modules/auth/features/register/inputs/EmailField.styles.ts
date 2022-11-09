import { createStyles } from '@mantine/core';
import { EmailState } from '@auth/state';


interface Params {
	email: EmailState;
}

const useStyles = createStyles((_, { email }: Params) => {
	const error = email.isError();

	return {
		error: {
			marginTop: '2px',
			height: '1rem', 
			fontSize: '0.7rem',
			opacity: Number(error),
		},
	};
});

export default useStyles;