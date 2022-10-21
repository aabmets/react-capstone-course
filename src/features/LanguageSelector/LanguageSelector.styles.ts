import { createStyles } from '@mantine/core';
import buttonStyles from '@styles/button.styles';

type Opened = { opened: boolean }

const useStyles = createStyles((theme, { opened }: Opened) => {
	const { lightStyle, darkStyle} = buttonStyles;
	const style = theme.colorScheme === 'light' 
		? lightStyle : darkStyle;

	return {
		button: {
			...style,
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '0px 10px',
			width: '8rem',
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[opened ? 5 : 6]
					: opened
					? theme.colors.gray[0]
					: theme.white
		},
		label: {
			fontWeight: 500,
			fontSize: theme.fontSizes.sm,
		},
		icon: {
			transition: 'transform 200ms ease',
			transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
		},
	};
});

export default useStyles;