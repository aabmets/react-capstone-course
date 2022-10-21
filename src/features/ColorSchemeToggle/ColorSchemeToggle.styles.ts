import { createStyles } from '@mantine/core';
import buttonStyles from '@styles/button.styles';

const useStyles = createStyles((theme) => {
	const { lightStyle, darkStyle} = buttonStyles;
	const style = (theme.colorScheme === 'light')
		? lightStyle : darkStyle;

	return {
		button: {
			...style,
			width: '2.2rem',
			transform: 'scale(1)',
			transition: 'transform 200ms',
			'&:active': {
				transform: 'scale(0.9)',
				transition: 'transform 50ms'
			}
		}
	};
});

export default useStyles;