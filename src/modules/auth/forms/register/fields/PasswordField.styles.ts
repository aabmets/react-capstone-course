import { createStyles } from '@mantine/core';
import { theme } from '@utils';
import { buttonStyles } from '@styles';
import { PasswordState } from '@auth/state';


interface Params {
	password: PasswordState;
}

const useStyles = createStyles((currentTheme, { password }: Params) => {
	const { colors, colorScheme } = currentTheme;
	const { lightStyle, darkStyle } = buttonStyles;
	
	const borderColor: string = (colorScheme === 'light' ? 
		lightStyle : darkStyle).borderColor;

	const filter: string = (colorScheme === 'light' ?
		'brightness(2)' : 'brightness(3)');

	const baseStyle = {
		width: '25%',
		height: '10px',
		border: '1px solid',
		cursor: 'default',
		borderColor,
		'&:hover': {
			cursor: 'default',
		},
	};
	const animationStyle = {
		animation: 'flash 500ms ease-out',
		'@keyframes flash': {
			'50%': {
				filter,
			},
		},
	};

	const { score } = password;
	const error = password.isError();
	const radius = theme.getDefaultRadius();

	const bgShade: number = (colorScheme === 'light' ? 6 : 8);
	const bgColor: string = {
		'0': colors.red[bgShade],
		'1': colors.red[bgShade],
		'2': colors.yellow[bgShade],
		'3': colors.cyan[bgShade],
		'4': colors.green[bgShade],
	}[score] || '';

	return {
		first: {
			...baseStyle,
			...(score >= 0 ? animationStyle : {}),
			backgroundColor: (score >= 0 ? bgColor : ''),
			borderBottomLeftRadius: radius,
		},
		second: {
			...baseStyle,
			...(score >= 2 ? animationStyle : {}),
			backgroundColor: (score >= 2 ? bgColor : ''),
		},
		third: {
			...baseStyle,
			...(score >= 3 ? animationStyle : {}),
			backgroundColor: (score >= 3 ? bgColor : ''),
		},
		fourth: {
			...baseStyle,
			...(score >= 4 ? animationStyle : {}),
			backgroundColor: (score >= 4 ? bgColor : ''),
			borderBottomRightRadius: radius,
		},
		input: {
			'.mantine-PasswordInput-input': {
				borderRadius: 0,
				borderTopLeftRadius: radius,
				borderTopRightRadius: radius,
			},
		},
		error: {
			height: '1rem', 
			fontSize: '0.7rem',
			opacity: Number(error),
		},
	};
});

export default useStyles;