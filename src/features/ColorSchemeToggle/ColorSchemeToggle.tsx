import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSunHigh, IconMoon } from '@tabler/icons';
import useStyles from './ColorSchemeToggle.styles';

function ColorSchemeToggle(): JSX.Element {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { t } = useTranslation('settings');
	const { classes } = useStyles();

	const moon = <IconMoon size={22} strokeWidth={1.2}/>
	const sun = <IconSunHigh size={22} strokeWidth={1.2}/>
	const icon = (colorScheme === 'light') ? moon : sun; 
	
	return (
		<ActionIcon className={classes.button}
			onClick={() => toggleColorScheme()}
			title={t("color-scheme-toggle.title")}
			variant="default"
			color='blue'>
		  		{icon}
		</ActionIcon>
	);
}

export default ColorSchemeToggle;