import { theme } from '@utils';
import siteConfig from 'site.config';


const { colors } = siteConfig.theme;

const buttonStyles = {
	baseStyle: {
		height: '2.2rem',
		width: '7rem',
		border: '1px solid',
		borderRadius: theme.getDefaultRadius(),
	},
	animationStyle: {
		transform: 'scale(1)',
		transition: 'transform 200ms',
		'&:active': {
			transform: 'scale(0.9)',
			transition: 'transform 50ms'
		}
	},
	lightStyle: {
		borderColor: colors.gray[4],
		'&:hover': {
			backgroundColor: colors.gray[0]
		}
	},
	darkStyle: {
		borderColor: colors.dark[4],
		'&:hover': {
			backgroundColor: colors.dark[5]
		}
	}
}

export default buttonStyles;