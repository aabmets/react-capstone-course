import React from 'react';
import { Fragment, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useLocalStorage } from 'usehooks-ts';
import { AppwriteException } from 'appwrite';
import { showNotification } from '@mantine/notifications';
import { useMantineColorScheme, Group } from '@mantine/core';
import { IconLogin, IconX } from '@tabler/icons';
import { useAppwriteContext } from '@context';
import { Menu, Button, Box, Space } from '@mantine/core';
import { BorderedButton } from '@components';
import * as ctx from '@auth/context';
import { DatastoreProvider } from '../../context';
import { useDatastoreState } from '../../state';
import { useNetworkState } from '../../state';
import { useModalState } from '../../state';
import { RedButton } from '@components';
import siteConfig from 'site.config';
import { PasswordInput, Text } from '@mantine/core';
import { Flex } from '@mantine/core';
import { IconKey } from '@tabler/icons';
import * as hooks from '@auth/hooks';
import { TextInput, Loader } from '@mantine/core';
import { IconCheck, IconAt } from '@tabler/icons';
import { IconInputSearch } from '@tabler/icons';
import { theme } from '@utils';
import * as state from '@auth/state';
import useStyles from './LoginButton.styles';
import { Client, Account } from "appwrite";
import appwriteConfig from 'appwrite.config';


const lsKey = siteConfig.auth.localStorage.currentUser;

export function LoginButton(): JSX.Element {
	const { t } = useTranslation('auth');
	const email = state.useEmailState();
	const network = state.useNetworkState();
	const password = state.usePasswordState();
	const [user, setUser] = useLocalStorage(lsKey, '');
	const { classes } = useStyles({ email, password });
	const { colorScheme } = useMantineColorScheme();
	const { account } = useAppwriteContext();
	const [opened, setOpened] = useState(false);

	function isValidInput(): boolean {
		let isValid = true;
		if (!email.value) {
			email.setError(t('auth.input-field.error.empty'));
			isValid = false;
		} 
		if (!password.value) {
			password.setError(t('auth.input-field.error.empty'));
			isValid = false;
		}
		return isValid;
	}

	function login() {
		const color = colorScheme === 'light' ? 'forestgreen' : 'limegreen';

		const sxStyle = {
			'.__mantine-ref-icon': {
				backgroundColor: 'transparent',
			},
			'.mantine-Notification-description': {
				fontSize: '1rem',
			}
		};
		if (isValidInput()) {
			account.createEmailSession(email.value, password.value)
				.then(() => {
					setTimeout(() => {
						setUser(email.value)
					}, 500)
					
					showNotification({
						message: t('auth.button.login.success'),
						icon: <IconLogin size={30} color={color} />,
						disallowClose: true,
						autoClose: 2000,
						sx: sxStyle,
					});
					setOpened(false);
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
	}

	return (
		<Menu opened={opened} onClose={() => setOpened(false)} onOpen={() => setOpened(true)} shadow="md" closeOnClickOutside={true} closeOnItemClick={false} offset={10} withArrow arrowSize={20} position='bottom-end' arrowOffset={45}>
			<Menu.Target>
				<Box>
					{user === '' && 
						<BorderedButton title={t('auth.button.login.title')}>
							{t('auth.button.login')}
						</BorderedButton>
					}
				</Box>
			</Menu.Target>
			<Menu.Dropdown className={classes.menuDropdown}>
				<Box className={classes.box}>

					<TextInput
						onChange={(event) => email.setValue(event.target.value)}
						error={email.isError()}
						label={t('auth.email-input.label')}
						placeholder={t('auth.email-input.placeholder')}
						icon={<IconAt size={16} />}
						className={classes.emailInput}
						radius={theme.getDefaultRadius()}
						name='email'
						autoComplete='off'
					/>
					<Space h={5}/>
					<PasswordInput 
						onChange={(event) => password.setValue(event.target.value)}
						error={password.isError()}
						className={classes.passwordInput}
						label={t('auth.password-input.label')}
						placeholder={t('auth.password-input.placeholder')}
						icon={<IconKey size={16}/>}
						
						/>
					<Space h={15}/>
					<Flex className={classes.flex}>
						<Text color='red' className={classes.error}>
							{email.error || password.error}
						</Text>
						<RedButton onClick={login}>
							{t("auth.button.submit")}
						</RedButton>
					</Flex>
				</Box>
				
			</Menu.Dropdown>
		</Menu>
	);
}