import { useMantineColorScheme } from '@mantine/core';
import { ModalProps } from '@mantine/core';
import siteConfig from "site.config";


export function useModalProps(): ModalProps {
	const { colorScheme } = useMantineColorScheme();
	const { colors } = siteConfig.theme;

	const overlayColor = (colorScheme === 'light') ?
		colors['dark'][3] : colors['gray'][7];

	return {
		size: 400,
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