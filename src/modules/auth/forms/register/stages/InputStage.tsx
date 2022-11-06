import React from 'react';
import axios from 'axios';
import { all } from 'itertools';
import { Fragment } from 'react';
import { AxiosResponse } from "axios";
import { useTranslation } from 'next-i18next';
import { LoadingOverlay } from '@mantine/core';
import { Box, Space, Group } from '@mantine/core';
import { BorderedButton, RedButton } from '@components';
import PasswordField from '../fields/PasswordField';
import EmailField from '../fields/EmailField';
import TermsField from '../fields/TermsField';
import siteConfig from 'site.config';
import * as ctx from '@auth/context';
import * as props from '@auth/props';
import * as hooks from '@auth/hooks';
import { ModalState } from '@auth/state';


interface ServerResponse extends AxiosResponse {
	data: {
		message: string;
		username: string;
		password: string;
	}
}
interface Props {
	modal: ModalState;
}

function InputStage({ modal }: Props): JSX.Element {
	const { form, email, password, terms } = ctx.useFormDataContext();
	const { t } = useTranslation('auth');
	const { auth } = siteConfig;

	const overlayProps = props.useLoadingOverlayProps();
	const validateForm = hooks.useFormValidator();

	function submitHandler(): void {
		if (validateForm()) {
			modal.setBusy(true);
			setTimeout(() => {
				const request = {
					url: '/api/create-user',
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					timeout: auth.formSubmitTimeoutMsec,
					data: { email, password, terms },
				}
				axios(request)
					.then((res: ServerResponse) => {
						if (res.status === 200) {
							const conditions = all([
								res.data.message === 'OK',
								res.data.username === email.value,
								res.data.password === password.value,
							]);
							if (conditions) {
								form.setSuccess()
							} else {
								form.setFailed()
							}
						} else {
							form.setFailed()
						}
					})
					.catch(() => {
						form.setFailed();
					})
					.finally(() => {
						modal.setBusy(false);
						// modal.closeModal();
						
					});
			}, auth.formSubmitDelayMsec);
		}
	}
	
	return (
		<Fragment>
			<LoadingOverlay {...overlayProps} visible={modal.busy}/>
			<Box sx={{ width:'100%', height:240 }}>
				<EmailField/>
				<Space h={5}/>
				<PasswordField/>
				<Space h={15}/>
				<TermsField/>
			</Box>
			<Group position='apart'>
				<BorderedButton disabled={modal.busy} onClick={modal.close}>
					{t("auth.button.back")}
				</BorderedButton>
				<RedButton disabled={modal.busy} onClick={submitHandler}>
					{t("auth.button.submit")}
				</RedButton>
			</Group>
		</Fragment>
	);
}

export default InputStage;