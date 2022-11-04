import { ModalProps } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import siteConfig from "site.config";


function useModalProps(): ModalProps {
	const { colorScheme } = useMantineColorScheme();
	const { colors } = siteConfig.theme;

	const overlayColor = (colorScheme === 'light') ?
		colors['dark'][3] : colors['gray'][7];

	return {
		size: 400,
		overlayColor,
		overlayBlur: 2,
		overlayOpacity: 0.2,
		transition: 'pop',
		transitionDuration: 200,
		closeOnClickOutside: false,
		centered: true,
	} as ModalProps;
}

export default useModalProps;