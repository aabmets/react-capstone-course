import { LoadingOverlayProps } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { ModalProps } from '@mantine/core';
import siteConfig from "site.config";


const { colors } = siteConfig.theme;

export function useLoadingOverlayProps(): LoadingOverlayProps {
	const { colorScheme } = useMantineColorScheme();
	const overlayColor = (colorScheme === 'light') ?
		colors['gray'][1] : colors['dark'][7];

	return {
		visible: true,
		overlayColor,
		overlayBlur: 2,
		loaderProps: {transform: 'scale(2)'},
	} as LoadingOverlayProps;
}

export function useModalProps(): ModalProps {
	const { colorScheme } = useMantineColorScheme();
	const overlayColor = (colorScheme === 'light') ?
		colors['dark'][3] : colors['gray'][7];

	return {
		size: 'target',
		overlayColor,
		overlayBlur: 3,
		overlayOpacity: 0.2,
		transition: 'pop',
		transitionDuration: 200,
		exitTransitionDuration: 200,
		transitionTimingFunction: "ease",
		closeOnClickOutside: false,
		closeOnEscape: true,
		centered: true,
	} as ModalProps;
}