import React from 'react';
import { Fragment } from 'react';
import axios, { AxiosResponse } from "axios";
import { useTranslation } from 'next-i18next';
import { LoadingOverlay } from '@mantine/core';
import { Box, Space, Group } from '@mantine/core';
import * as EmailValidator from 'email-validator';
import { BorderedButton, RedButton } from '@components';
import { useLoadingOverlayProps } from '@auth/props';
import { useFormDataContext } from '@auth/context';
import { ModalState } from '@auth/state';
import siteConfig from 'site.config';


function useFormValidatorEffect(): () => boolean {
	const { email, password, terms } = useFormDataContext();

	function validateForm() {
		let isValid = true;

		if (!email.value) {
			email.setError('auth.input-field.error.empty');
			isValid &&= false;
		} else if (!EmailValidator.validate(email.value)) {
			email.setError('auth.email-input.error.malformed');
			isValid &&= false;
		} else if (email.isError()) {
			isValid &&= false;
		}
		
		if (!password.value) {
			password.setError('auth.input-field.error.empty');
			isValid &&= false;
		} else if (password.value === email.value) {
			password.setError('auth.password-input.error.eq-email');
			isValid &&= false;
		} else if (password.value.includes(' ')) {
			password.setError('auth.password-input.error.no-spaces');
			isValid &&= false;
		} else if (password.score <= 2) {
			password.setError('auth.password-input.error.too-weak');
			isValid &&= false;
		} else if (password.isError()) {
			isValid &&= false;
		}
		
		if (!terms.value) {
			terms.setError('auth.terms-checkbox.error');
			isValid &&= false;
		} else if (terms.isError()) {
			isValid &&= false;
		}

		return isValid;
	}
	
	return validateForm;
}

export default useFormValidatorEffect;