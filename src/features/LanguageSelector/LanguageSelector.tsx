import React, { useState } from 'react';
import { UnstyledButton, Button, Menu, Image, Group, MenuDividerProps, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import { useTranslation } from 'next-i18next';
import useStyles from './LanguageSelector.styles';
import { useRouter } from 'next/router';
import * as cookies from '@utils/cookies';

interface ListItem {
	locale: string,
	label: string,
	image: string
}

const data = [
	{ locale: 'en', label: 'English', image: '/flag-united-states.png' },
	{ locale: 'et', label: 'Eesti', image: '/flag-estonia.png' }
]

function LanguageSelector() {
	const router = useRouter();
	const { t, i18n } = useTranslation('settings');
	const [opened, setOpened] = useState<boolean>(false);
	const { classes } = useStyles({ opened });
	const [selected, setSelected] = useState<ListItem>(
		data.find(e => e.locale === i18n.language) as ListItem
	);
	
	function changeLanguage(item: ListItem): void {
		setSelected(item);
		cookies.setLanguage(item.locale);
		router.push(router.pathname, router.asPath);
	}

	const items = data.map((item) => (
		<Menu.Item
		  	icon={<Image src={item.image} width={18} height={18} alt=''/>}
		  	onClick={() => changeLanguage(item)}
		  	key={item.label}>
				{item.label}
		</Menu.Item>
	));

	return (
		<Menu width="target" trigger='hover'
			onOpen={() => setOpened(true)} 
			onClose={() => setOpened(false)} 
			opened={opened}>
				<Menu.Target>
					<UnstyledButton className={classes.button} title={t('language-selector.title')}>
						<Group spacing="xs">
							<Image src={selected.image} width={22} height={22} alt='' />
							<span className={classes.label}>{selected.label}</span>
						</Group>
						<IconChevronDown className={classes.icon} size={16} stroke={1.5} />
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>{items}</Menu.Dropdown>
		</Menu>
	);
}

export default LanguageSelector;