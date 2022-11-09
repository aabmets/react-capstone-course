import { createStyles } from '@mantine/core';
import * as state from '@auth/state';


interface Params {
	email: state.EmailState;
	password: state.PasswordState;
};

const useStyles = createStyles((theme, { email, password }: Params) => {
	const error = email.isError() || password.isError();
	const { colorScheme, colors } = theme;

	const borderColor = colorScheme === 'light' ?
		colors.gray[4] : colors.dark[4];

	return {
		menuDropdown: {
			borderWidth: '1.5px',
			borderColor,
			'.mantine-Menu-arrow': {
				borderWidth: '1.5px',
				borderColor,
			},
		},
		error: {
			inlineSize: '50%',
			height: '1rem', 
			fontSize: '0.7rem',
			opacity: Number(error),
		},
	};
});

export default useStyles;