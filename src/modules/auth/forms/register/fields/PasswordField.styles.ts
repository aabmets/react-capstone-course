import { createStyles } from '@mantine/core';
import { buttonStyles } from '@styles';
import { PasswordState } from '@auth/state';
import { PasswordScore } from '@auth/hooks';
import { theme } from '@utils';


interface Params {
	password: PasswordState;
}

const useStyles = createStyles((currentTheme, { password }: Params) => {
	const { colors, colorScheme } = currentTheme;
	const { lightStyle, darkStyle } = buttonStyles;
	
	const borderColor: string = password.isError() ? colors.red[7] : 
		(colorScheme === 'light' ? lightStyle : darkStyle).borderColor;

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

	const { score, isError } = password;
	const radius = theme.getDefaultRadius();

	const bgShade: number = (colorScheme === 'light' ? 6 : 8);
	const disabledColor: string = (colorScheme === 'light' ?
		colors.gray[4] : colors.dark[4]);

	const bgColor: string = {
		[PasswordScore.LEVEL0]: colors.red[bgShade],
		[PasswordScore.LEVEL1]: colors.red[bgShade],
		[PasswordScore.LEVEL2]: colors.yellow[bgShade],
		[PasswordScore.LEVEL3]: colors.cyan[bgShade],
		[PasswordScore.LEVEL4]: colors.green[bgShade],
	}[score] || (score === PasswordScore.DISABLED ? disabledColor : '');

	function getBackgroundColor(condition: boolean): string {
		if (score === PasswordScore.DISABLED) {
			return bgColor;
		} else if (condition) {
			return bgColor;
		} else {
			return '';
		}
	}
	return {
		first: {
			...baseStyle,
			...(score >= 0 ? animationStyle : {}),
			backgroundColor: getBackgroundColor(score >= 0),
			borderBottomLeftRadius: radius,
		},
		second: {
			...baseStyle,
			...(score >= 2 ? animationStyle : {}),
			backgroundColor: getBackgroundColor(score >= 2),
		},
		third: {
			...baseStyle,
			...(score >= 3 ? animationStyle : {}),
			backgroundColor: getBackgroundColor(score >= 3),
		},
		fourth: {
			...baseStyle,
			...(score >= 4 ? animationStyle : {}),
			backgroundColor: getBackgroundColor(score >= 4),
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
			opacity: Number(isError()),
		},
	};
});

export default useStyles;