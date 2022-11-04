import React, { Fragment } from 'react';
import axios, { AxiosResponse } from "axios";
import { useTranslation } from 'next-i18next';
import { LoadingOverlay } from '@mantine/core';
import { Box, Space, Group } from '@mantine/core';
import { BorderedButton, RedButton } from '@components';
import { useStageStyles } from  '../RegisterForm.styles';
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

export function InputStage({ modal }: Props): JSX.Element {
	const { form, email, password, terms } = ctx.useFormDataContext();
	const { classes } = useStageStyles();
	const { t } = useTranslation('auth');
	const { setFailed, setSuccess } = form;

	const overlayProps = props.useLoadingOverlayProps();
	const validateForm = hooks.useFormValidatorEffect();

	function submitHandler(): void {
		if (validateForm()) {
			modal.setBusy(true);
			setTimeout(() => {
				const data = { email, password, terms };
				axios.post('/api/create-user', data)
					.then((res: ServerResponse) => {
						const failed = [
							res.data.message === 'OK',
							res.data.username === email.value,
							res.data.password === password.value,
						].includes(false);
						(failed ? setFailed : setSuccess)();
					})
					.catch(setFailed)
					.finally(() => modal.setBusy(false));
			}, siteConfig.auth.submit_delay_ms);
		}
	}
	
	return (
		<Fragment>
			<LoadingOverlay {...overlayProps} visible={modal.busy}/>
			<Box className={classes.box}>
				<EmailField/>
				<Space sx={{height: '5px'}}/>
				<PasswordField/>
				<Space sx={{height: '15px'}}/>
				<TermsField/>
			</Box>
			<Group position='apart'>
				<BorderedButton disabled={modal.busy} onClick={modal.closeModal}>
					{t("auth.button.cancel")}
				</BorderedButton>
				<RedButton disabled={modal.busy} onClick={submitHandler}>
					{t("auth.button.submit")}
				</RedButton>
			</Group>
		</Fragment>
	);
}