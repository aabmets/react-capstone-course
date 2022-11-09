import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { useLocalStorage } from 'usehooks-ts';
import { useMantineColorScheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconLogout } from '@tabler/icons';
import { BorderedButton } from '@components';
import { useAppwriteContext } from '@context';
import siteConfig from 'site.config';


const lsKey = siteConfig.auth.localStorage.currentUser;

export function LogoutButton(): JSX.Element {
	const [user, setUser] = useLocalStorage(lsKey, '');
	const { colorScheme } = useMantineColorScheme();
	const { account } = useAppwriteContext();
	const { t } = useTranslation('auth');

	const color = colorScheme === 'light' ? 'forestgreen' : 'limegreen';

	function handler() {
		setUser('');
		showNotification({
			message: t('auth.button.logout.message'),
			icon: <IconLogout size={30} color={color} />,
			disallowClose: true,
			autoClose: 2000,
			sx: {
				'.__mantine-ref-icon': {
					backgroundColor: 'transparent',
				},
				'.mantine-Notification-description': {
					fontSize: '1rem',
				}
			}
		});
	}
	
	function logout() {
		account.deleteSession('current')
			.then(handler)
			.catch(handler);
	}

	return (
		<Fragment>
			{user !== '' && <BorderedButton onClick={logout} title={t('auth.button.logout.title')}>
				{t('auth.button.logout')}
			</BorderedButton>}
		</Fragment>
	);
}