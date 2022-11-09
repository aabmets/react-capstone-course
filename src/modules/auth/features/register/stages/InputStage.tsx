import React from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import { AxiosResponse } from "axios";
import { useTranslation } from 'next-i18next';
import { Box, Space, Group } from '@mantine/core';
import { useAuthDatastoreContext } from '@auth/context';
import { BorderedButton } from '@components';
import { RedButton } from '@components';
import * as hooks from '@auth/hooks';
import siteConfig from 'site.config';
import EmailField from '../inputs/EmailField';
import PasswordField from '../inputs/PasswordField';
import TermsCheckbox from '../inputs/TermsCheckbox';


interface ServerResponse extends AxiosResponse {
	data: {
		message: string;
		username: string;
		exception: object;
	}
}

function InputStage(): JSX.Element {
	const { email, password, terms, form } = useAuthDatastoreContext();
	const { t } = useTranslation('auth');
	const { auth } = siteConfig;

	const validateForm = hooks.useFormValidator();

	function formSubmitHandler(): void {
		if (validateForm()) {
			form.setBusy();

			setTimeout(() => {
				const request = {
					url: '/api/auth/create-account',
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					timeout: auth.formSubmitTimeoutMsec,
					data: { 
						email: email.value, 
						password: password.value, 
						terms: terms.value,
					},
				}
				axios(request)
					.then((res: ServerResponse) => {
						if (res.status === 200) {
							const { message, username } = res.data;
							if (message === 'OK' && username === email.value) {
								form.setSuccess();
							} else {
								form.setFailed();
							}
						} else {
							form.setFailed();
						}
					})
					.catch(form.setFailed)
					.finally(form.setIdle);
			}, auth.formSubmitDelayMsec);
		}
	}

	return (
		<Fragment>
			<Box sx={{ width: 360, height: 242 }}>
				<EmailField/>
				<Space h={5}/>
				<PasswordField/>
				<Space h={15}/>
				<TermsCheckbox/>
			</Box>
			<Group position='apart'>
				<BorderedButton disabled={form.isBusy()} onClick={form.resetForm}>
					{t("auth.button.back")}
				</BorderedButton>
				<RedButton disabled={form.isBusy()} onClick={formSubmitHandler}>
					{t("auth.button.submit")}
				</RedButton>
			</Group>
		</Fragment>
	);
}

export default InputStage;