import React from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import { AxiosResponse } from "axios";
import { useTranslation } from 'next-i18next';
import { Box, Space, Group } from '@mantine/core';
import { BorderedButton, RedButton } from '@components';
import PasswordField from '../fields/PasswordField';
import EmailField from '../fields/EmailField';
import TermsField from '../fields/TermsField';
import * as hooks from '@auth/hooks';
import * as ctx from '@auth/context';
import siteConfig from 'site.config';


interface ServerResponse extends AxiosResponse {
	data: {
		message: string;
		username: string;
		exception: object;
	}
}

function InputStage(): JSX.Element {
	const { form, modal, datastore } = ctx.useDatastoreContext();
	const { email, password, terms } = ctx.useDatastoreContext();
	const { t } = useTranslation('auth');
	const { auth } = siteConfig;

	const validateForm = hooks.useFormValidator();

	function submitHandler(): void {
		if (validateForm()) {
			modal.setBusy();

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
					.finally(modal.setIdle);
			}, auth.formSubmitDelayMsec);
		}
	}

	function closeAndReset() {
		modal.close();
		datastore.reset();
	}
	
	return (
		<Fragment>
			<Box sx={{ width: 360, height: 242 }}>
				<EmailField/>
				<Space h={5}/>
				<PasswordField/>
				<Space h={15}/>
				<TermsField/>
			</Box>
			<Group position='apart'>
				<BorderedButton disabled={modal.isBusy()} onClick={closeAndReset}>
					{t("auth.button.back")}
				</BorderedButton>
				<RedButton disabled={modal.isBusy()} onClick={submitHandler}>
					{t("auth.button.submit")}
				</RedButton>
			</Group>
		</Fragment>
	);
}

export default InputStage;