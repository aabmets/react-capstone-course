import React from 'react';
import axios from 'axios';
import { all } from 'itertools';
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
		password: string;
	}
}

function InputStage(): JSX.Element {
	const data = ctx.useDatastoreContext();
	const { t } = useTranslation('auth');
	const { form, modal } = data;
	const { auth } = siteConfig;

	const validateForm = hooks.useFormValidator();

	function submitHandler(): void {
		if (validateForm()) {
			modal.setBusy();

			setTimeout(() => {
				const request = {
					url: '/api/create-user',
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					timeout: auth.formSubmitTimeoutMsec,
					data: { 
						email: data.email.value, 
						password: data.password.value, 
						terms: data.terms.value,
					},
				}
				axios(request)
					.then((res: ServerResponse) => {
						if (res.status === 200) {
							const conditions = all([
								res.data.message === 'OK',
								res.data.username === data.email.value,
								res.data.password === data.password.value,
							]);
							if (conditions) {
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
				<BorderedButton disabled={modal.isBusy()} onClick={modal.close}>
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