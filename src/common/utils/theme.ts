import { MantineSize } from '@mantine/core';
import siteConfig from 'site.config';


export function getDefaultRadius(): number {
	const { radius, defaultRadius } = siteConfig.theme;
	return radius[defaultRadius as MantineSize];
}

export function getDefaultHoverShade(): number {
	const shade = siteConfig.theme.primaryShade;
	return (shade === 9) ? 8 : (shade + 1); 
}

export function getShadedPrimaryColor(): string {
	const { colors, primaryColor, primaryShade } = siteConfig.theme;
	return colors[primaryColor][primaryShade];
}