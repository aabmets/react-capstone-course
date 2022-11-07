import { LoadingOverlayProps } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import siteConfig from "site.config";


export function useLoadingOverlayProps(): LoadingOverlayProps {
	const { colorScheme } = useMantineColorScheme();
	const { colors } = siteConfig.theme;
	
	const overlayColor = (colorScheme === 'light') ?
		colors['gray'][1] : colors['dark'][7];

	return {
		visible: true,
		overlayColor,
		overlayBlur: 2,
		loaderProps: {transform: 'scale(2)'},
	} as LoadingOverlayProps;
}