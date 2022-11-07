import React from 'react';
import { NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Flex, Space } from '@mantine/core';
import { getRequestAttributes } from '@server';
import { ColorSchemeToggle } from '@components';
import { LanguageSelector } from '@components';
import { RegisterButton } from '@auth/buttons';
import { LogoutButton } from '@auth/buttons';
import { LoginButton } from '@auth/buttons';


function MainPage() {
	return (
		<Flex>
			<ColorSchemeToggle />
			<Space w={20} />
			<LanguageSelector />
			<Space w={20} />
			<RegisterButton />
			<Space w={20} />
			<LogoutButton />
			<LoginButton />
		</Flex>
	)
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