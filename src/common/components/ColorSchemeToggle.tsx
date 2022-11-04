import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import { ActionIcon, MantineTheme } from '@mantine/core';
import { IconSunHigh, IconMoon } from '@tabler/icons';
import { buttonStyles } from '@styles';


function ColorSchemeToggle(): JSX.Element {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { t } = useTranslation('settings');

	const moon = <IconMoon size={22} strokeWidth={1.2}/>
	const sun = <IconSunHigh size={22} strokeWidth={1.2}/>
	const icon = (colorScheme === 'light') ? moon : sun; 

	function getStyle(theme: MantineTheme) {
		const { lightStyle, darkStyle } = buttonStyles;
		return {
			...buttonStyles.baseStyle,
			...buttonStyles.animationStyle,
			...(theme.colorScheme === 'light') ? 
				lightStyle : darkStyle,
			width: '2.2rem'
		}
	}
	
	return (
		<ActionIcon sx={(theme) => getStyle(theme)}
			onClick={() => toggleColorScheme()}
			title={t("color-scheme-toggle.title")}
			variant="default">
		  		{icon}
		</ActionIcon>
	);
}

export default ColorSchemeToggle;