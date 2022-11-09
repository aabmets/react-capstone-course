import React from 'react';
import { Fragment } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useTranslation } from 'next-i18next';
import { RegisterForm } from './form/RegisterForm';
import { AuthDatastoreProvider } from '@auth/context';
import { useFormState } from '@auth/state';
import { RedButton } from '@components';
import siteConfig from 'site.config';


const currentUser = siteConfig.auth.localStorage.currentUser;

export function RegisterButton() {
	const [user, _] = useLocalStorage(currentUser, '');
	const { t } = useTranslation('auth');
	const form = useFormState()

	return (
		<Fragment>
			<AuthDatastoreProvider key={form.resetKey} persist={{ form }}>
				<RegisterForm />
			</AuthDatastoreProvider>
  
			{user === '' && <RedButton onClick={form.setOpened} title={t('auth.button.register.title')}>
				{t('auth.button.register')}
			</RedButton>}
	  	</Fragment>
	);
}