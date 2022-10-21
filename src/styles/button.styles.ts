import { MantineSize } from '@mantine/core';
import siteConfig from 'site.config';

const { defaultRadius, primaryShade, colors, radius } = siteConfig.theme;
const borderRadius = radius[defaultRadius as MantineSize];

const buttonStyles = {
	lightStyle: {
		height: '2.2rem',
		border: '1.5px solid',
		borderColor: colors.gray[primaryShade],
		borderRadius: borderRadius,
		'&:hover': {
			backgroundColor: colors.gray[0]
		}
	},
	darkStyle: {
		height: '2.2rem',
		border: '1.5px solid',
		borderColor: colors.dark[primaryShade],
		borderRadius: borderRadius,
		'&:hover': {
			backgroundColor: colors.dark[5]
		}
	}
}

export default buttonStyles;