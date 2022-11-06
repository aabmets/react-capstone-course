import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { FormDataProvider } from '../context';
import { useModalState } from '../state';
import { RegisterForm } from '../forms';
import { RedButton } from '@components';


function RegisterButton() {
	const { t } = useTranslation('auth');
	const modal = useModalState();
	
	return (
		<Fragment>
			<FormDataProvider key={modal.key}>
				<RegisterForm modal={modal}/>
			</FormDataProvider>
  
			<RedButton onClick={modal.open}>
				{t('auth.button.register')}
			</RedButton>
	  	</Fragment>
	);
}

export default RegisterButton;