import { any } from 'itertools';
import { createStyles } from '@mantine/core';
import { PasswordState } from '@auth/state';
import { PasswordScore } from '@auth/state';
import { buttonStyles } from '@styles';
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

	const bgShade: number = (colorScheme === 'light' ? 6 : 8);
	const disabledColor: string = (colorScheme === 'light' ?
		colors.gray[4] : colors.dark[4]);

	const bgColor: string = {
		[PasswordScore.EMPTY]: '',
		[PasswordScore.DISABLED]: disabledColor,
		[PasswordScore.LEVEL0]: colors.red[bgShade],
		[PasswordScore.LEVEL1]: colors.red[bgShade],
		[PasswordScore.LEVEL2]: colors.yellow[bgShade],
		[PasswordScore.LEVEL3]: colors.cyan[bgShade],
		[PasswordScore.LEVEL4]: colors.green[bgShade],
	}[password.score];

	function getStyle(level: PasswordScore): object {
		const condition = password.score >= level;
		const style = {
			...baseStyle,
			...(condition ? animationStyle : {}),
			backgroundColor: any([
				password.score === PasswordScore.DISABLED,
				password.score === PasswordScore.EMPTY,
				condition,
			]) ? bgColor : '',
		};
		return style;
	}

	const radius = theme.getDefaultRadius();

	return {
		first: { ...getStyle(PasswordScore.LEVEL0), borderBottomLeftRadius: radius },
		second: { ...getStyle(PasswordScore.LEVEL2) },
		third: { ...getStyle(PasswordScore.LEVEL3) },
		fourth: { ...getStyle(PasswordScore.LEVEL4), borderBottomRightRadius: radius },
		input: {
			'.mantine-PasswordInput-input': {
				borderRadius: 0,
				borderTopLeftRadius: radius,
				borderTopRightRadius: radius,
			},
		},
		error: {
			marginTop: '2px',
			height: '1rem', 
			fontSize: '0.7rem',
			opacity: Number(password.isError()),
		},
	};
});

export default useStyles;