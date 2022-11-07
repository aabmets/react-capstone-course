import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { useLocalStorage } from 'usehooks-ts';
import { AppwriteException } from 'appwrite';
import { showNotification } from '@mantine/notifications';
import { useMantineColorScheme } from '@mantine/core';
import { IconLogin, IconX } from '@tabler/icons';
import { useAppwriteContext } from '@context';
import { BorderedButton } from '@components';


export function LoginButton(): JSX.Element {
	const [user, setUser] = useLocalStorage('logged-in-user', '');
	const { colorScheme } = useMantineColorScheme();
	const { account } = useAppwriteContext();
	const { t } = useTranslation('auth');

	const color = colorScheme === 'light' ? 'forestgreen' : 'limegreen';

	const sxStyle = {
		'.__mantine-ref-icon': {
			backgroundColor: 'transparent',
		},
		'.mantine-Notification-description': {
			fontSize: '1rem',
		}
	};

	function login() {
		const email = 'mattias@aabmets.ee';
		const password = 'Vrys7rgpswrd';
		account.createEmailSession(email, password)
			.then(() => {
				setUser(email)
				showNotification({
					message: t('auth.button.login.success'),
					icon: <IconLogin size={30} color={color} />,
					disallowClose: true,
					autoClose: 2000,
					sx: sxStyle,
				});
			})
			.catch((ex: AppwriteException) => {
				let localeKey = 'auth.button.login.failed';
				if (ex.code === 0) {
					localeKey = 'auth.button.login.failed.no-network';
				} else if (ex.code === 401) {
					localeKey = 'auth.button.login.failed.bad-creds';
				}
				showNotification({
					message: t(localeKey),
					icon: <IconX size={30} color='red' />,
					disallowClose: false,
					autoClose: 3000,
					sx: sxStyle,
				});
			});
	}

	return (
		<Fragment>
			{user === '' && 
				<BorderedButton onClick={login} title={t('auth.button.login.title')}>
					{t('auth.button.login')}
				</BorderedButton>
			}
		</Fragment>
	);
}