import React from 'react';
import Image from 'next/image';
import { NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRequestAttributes } from '@server';
import { Group } from '@mantine/core';


function MainPage() {
	return (
		<Group position="center">
			<Image src="/background.jpg" alt='' width={640} height={425}/>
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

export default MainPage;