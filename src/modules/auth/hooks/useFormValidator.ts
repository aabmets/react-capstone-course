import { useTranslation } from 'next-i18next';
import * as EmailValidator from 'email-validator';
import { useDatastoreContext } from '@auth/context';


export function useFormValidator(): () => boolean {
	const { email, password, terms, network } = useDatastoreContext();
	const goodNet = network.isLatencyGood();
	const { t } = useTranslation('auth');

	function validateForm() {
		let isValid = true;

		if (!email.value) {
			email.setError(t('auth.input-field.error.empty'));
			isValid &&= false;
		} else if (!EmailValidator.validate(email.value)) {
			email.setError(t('auth.email-input.error.malformed'));
			isValid &&= false;
		} else if (email.isError()) {
			isValid &&= false;
		}
		
		if (!password.value) {
			password.setError(t('auth.input-field.error.empty'));
			isValid &&= false;
		} else if (password.value === email.value) {
			password.setError(t('auth.password-input.error.eq-email'));
			isValid &&= false;
		} else if (password.value.includes(' ')) {
			password.setError(t('auth.password-input.error.no-spaces'));
			isValid &&= false;
		} else if (password.score <= 2 && goodNet) {
			password.setError(t('auth.password-input.error.too-weak'));
			isValid &&= false;
		} else if (password.isError()) {
			isValid &&= false;
		}
		
		if (!terms.value) {
			terms.setError(t('auth.terms-checkbox.error'));
			isValid &&= false;
		} else if (terms.isError()) {
			isValid &&= false;
		}

		return isValid;
	}
	
	return validateForm;
}