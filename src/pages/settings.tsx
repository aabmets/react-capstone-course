import React from 'react';
import { Group } from '@mantine/core';
import { NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRequestAttributes } from '@server';
import { ColorSchemeToggle } from '@components';
import { LanguageSelector } from '@components';


function SettingsPage() {
	return (
		<Group position='center' spacing='xl' sx={{position: 'relative', height: '40%'}}>
			<ColorSchemeToggle />
			<LanguageSelector />
		</Group>
	);
}

export async function getServerSideProps({ req }: NextPageContext) {
	const { scheme, locale } = getRequestAttributes(req);
	const ts = await serverSideTranslations(
		locale, ['common', 'settings', 'auth']
	);
	return {
		props: {
			...ts, 
			locale, 
			scheme
		}
	};
}

export default SettingsPage;