import * as EmailValidator from 'email-validator';
import * as ctx from '@auth/context';


function useFormValidator(): () => boolean {
	const { email, password, terms } = ctx.useFormDataContext();

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

export default useFormValidator;