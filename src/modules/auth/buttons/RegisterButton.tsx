import React from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { DatastoreProvider } from '../context';
import { useDatastoreState } from '../state';
import { useNetworkState } from '../state';
import { useModalState } from '../state';
import { RegisterForm } from '../forms';
import { RedButton } from '@components';


export function RegisterButton() {
	const { t } = useTranslation('auth');
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
  
			<RedButton onClick={openModalForm} title={t('auth.button.register.title')}>
				{t('auth.button.register')}
			</RedButton>
	  	</Fragment>
	);
}