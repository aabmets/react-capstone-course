import React from 'react';
import Lottie from 'lottie-react';
import { useRef } from 'react';
import { AppwriteException } from 'appwrite';
import { useLocalStorage } from 'usehooks-ts';
import { useTranslation } from 'next-i18next';
import { IconLogin, IconX } from '@tabler/icons';
import { LottieRefCurrentProps } from 'lottie-react';
import { useMantineColorScheme } from '@mantine/core';
import { Space, Group, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useAuthDatastoreContext } from '@auth/context';
import { useAppwriteContext } from '@context';
import { RedButton } from '@components';
import siteConfig from 'site.config';
import successLottie from 'public/success-lottie.json';


const lsKey = siteConfig.auth.localStorage.currentUser;

function SuccessStage(): JSX.Element {
	const { email, password, form } = useAuthDatastoreContext();
	const { colorScheme } = useMantineColorScheme();
	const [_, setUser] = useLocalStorage(lsKey, '');
	const { account } = useAppwriteContext();
	const { t } = useTranslation('auth');

	const lottieRef = useRef<LottieRefCurrentProps | null>(null);
	lottieRef.current?.setSpeed(0.8);

	const lottieProps = {
		loop: false,
		lottieRef: lottieRef,
		animationData: successLottie,
		style: { 
			width: 70, 
			height: 70 
		},
	};

	function loginOnClick() {
		const sxStyle = {
			'.__mantine-ref-icon': {
				backgroundColor: 'transparent',
			},
			'.mantine-Notification-description': {
				fontSize: '1rem',
			}
		};
		const successColor = colorScheme === 'light' ? 
			'forestgreen' : 'limegreen';

		account.createEmailSession(email.value, password.value)
			.then(() => {
				setUser(email.value)
				showNotification({
					message: t('auth.button.login.success'),
					icon: <IconLogin size={30} color={successColor} />,
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
					icon: <IconX size={30} color='crimson' />,
					disallowClose: false,
					autoClose: 3000,
					sx: sxStyle,
				});
			})
			.finally(form.resetForm);
	}
	
	return (
		<Group>
			<Lottie {...lottieProps} /> 
			<Space h={5}/>
			<Stack align="center" justify="flex-start">
				<Text sx={{fontSize: '1rem', fontWeight: 700 }}>
					{t('auth.message.user-created')}
				</Text>
				<RedButton onClick={loginOnClick}>
					{t("auth.button.login")}
				</RedButton>
			</Stack>
		</Group>
	);
}

export default SuccessStage;