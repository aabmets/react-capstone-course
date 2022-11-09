import React from 'react';
import * as EmailValidator from 'email-validator';
import { useTranslation } from 'next-i18next';
import { useLocalStorage } from 'usehooks-ts';
import { AppwriteException } from 'appwrite';
import { useAppwriteContext } from '@context';
import { Menu, Box, Space } from '@mantine/core';
import { Text, Flex, MenuProps } from '@mantine/core';
import { RedButton, BorderedButton } from '@components';
import { useAuthDatastoreContext } from '@auth/context';
import * as hooks from '@auth/hooks';
import useStyles from './LoginForm.styles';
import EmailField from '../inputs/EmailField';
import PasswordField from '../inputs/PasswordField';
import siteConfig from 'site.config';


const lsKey = siteConfig.auth.localStorage.currentUser;

export function LoginForm() {
	const { t } = useTranslation('auth');
	const { email, password, form } = useAuthDatastoreContext();
	const [user, setUser] = useLocalStorage(lsKey, '');
	const { classes } = useStyles({ email, password });
	const { account } = useAppwriteContext();
	const notifications = hooks.useNotifications();

	function validateForm(): boolean {
		let isValid = true;
		if (!email.value) {
			email.setError(t('auth.input-field.error.empty'));
			isValid = false;
		} else if (!EmailValidator.validate(email.value)) {
			console.log("wtf is this inpuyt")
			const message = t('auth.button.login.failed.bad-creds');
			password.setError(message);
			email.setError(message);
			isValid = false;
		}
		if (!password.value) {
			password.setError(t('auth.input-field.error.empty'));
			isValid = false;
		}
		return isValid;
	}

	function onClickHandler() {
		if (validateForm()) {
			account.createEmailSession(email.value, password.value)
				.then(() => {
					notifications.notifyLoginSuccess();
					setTimeout(() => {
						setUser(email.value)
					}, 500);
					form.resetForm();
				})
				.catch((ex: AppwriteException) => {
					if (ex.code === 400 || ex.code === 401) {
						const message = t('auth.button.login.failed.bad-creds');
						password.setError(message);
						email.setError(message);
					} else {
						if (ex.code === 0) {
							notifications.notifyNetworkError();
						} else {
							notifications.notifyLoginFailed();
						}
						form.resetForm();
					}
				});
		}
	}

	const menuProps = {
		opened: form.isOpened(), 
		onClose: form.setClosed, 
		onOpen: form.setOpened, 
		closeOnClickOutside: true, 
		closeOnItemClick: false, 
		position: 'bottom-end', 
		offset: 10,
		withArrow: true, 
		arrowSize: 20, 
		arrowOffset: 45,
		shadow: "md", 
	} as MenuProps

	return (
		<Menu {...menuProps}>
			<Menu.Target>
				<Box>
					{user === '' && <BorderedButton title={t('auth.button.login.title')}>
						{t('auth.button.login')}
					</BorderedButton>}
				</Box>
			</Menu.Target>
			<Menu.Dropdown className={classes.menuDropdown}>
				<Box sx={{padding: 10, width: 300}}>
					<EmailField/>
					<Space h={5}/>
					<PasswordField/>
					<Space h={15}/>
					<Flex justify='space-between'>
						<Text color='red' className={classes.error}>
							{email.error || password.error}
						</Text>
						<RedButton onClick={onClickHandler}>
							{t("auth.button.submit")}
						</RedButton>
					</Flex>
				</Box>
			</Menu.Dropdown>
		</Menu>
	);
}