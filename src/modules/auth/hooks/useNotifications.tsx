import React from 'react';
import { useTranslation } from 'next-i18next';
import { showNotification } from '@mantine/notifications';
import { useMantineColorScheme } from '@mantine/core';
import { IconLogin, IconX } from '@tabler/icons';
import { IconLogout } from '@tabler/icons';
import siteConfig from 'site.config';


const closeDelay = siteConfig.auth.notificationCloseMsec;

export function useNotifications() {
	const { colorScheme } = useMantineColorScheme();
	const { t } = useTranslation('auth');

	const successColor = colorScheme === 'light' ? 
		'forestgreen' : 'limegreen';
	
	const baseNotification = {
		disallowClose: false,
		autoClose: closeDelay,
		sx: {
			'.__mantine-ref-icon': {
				backgroundColor: 'transparent',
			},
			'.mantine-Notification-description': {
				fontSize: '1rem',
			}
		},
	}
	
	return {
		notifyLoginSuccess: () => {
			showNotification({
				message: t('auth.button.login.success'),
				icon: <IconLogin size={30} color={successColor} />,
				...baseNotification,
			})
		},
		notifyLoginFailed: () => {
			showNotification({
				message: t('auth.button.login.failed'),
				icon: <IconX size={30} color='red' />,
				...baseNotification,
			});
		},
		notifyLogoutSuccess: () => {
			showNotification({
				message: t('auth.button.logout.message'),
				icon: <IconLogout size={30} color={successColor} />,
				...baseNotification,
			})
		},
		notifyNetworkError: () => {
			showNotification({
				message: t('auth.button.login.failed.no-network'),
				icon: <IconX size={30} color='red' />,
				...baseNotification,
			})
		}
	}
}