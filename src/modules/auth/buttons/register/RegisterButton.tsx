import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { useLocalStorage } from 'usehooks-ts';
import { DatastoreProvider } from '@auth/context';
import { useDatastoreState } from '@auth/state';
import { useNetworkState } from '@auth/state';
import { useModalState } from '@auth/state';
import { RedButton } from '@components';
import { RegisterForm } from './form/RegisterForm';
import siteConfig from 'site.config';


const lsKey = siteConfig.auth.localStorage.currentUser;

export function RegisterButton() {
	const { t } = useTranslation('auth');
	const [user, _] = useLocalStorage(lsKey, '');
	const datastore = useDatastoreState();
	const network = useNetworkState()
	const modal = useModalState()

	function openModalForm() {
		network.setLatencyGood();
		network.testLatency();
		modal.open();
	}

	return (
		<Fragment>
			<DatastoreProvider key={datastore.key} persist={{ datastore, network, modal }}>
				<RegisterForm />
			</DatastoreProvider>
  
			{user === '' && 
				<RedButton onClick={openModalForm} title={t('auth.button.register.title')}>
					{t('auth.button.register')}
				</RedButton>
			}
	  	</Fragment>
	);
}