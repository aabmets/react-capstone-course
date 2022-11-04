import React from 'react';
import { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRequestAttributes } from '@server';
import { ColorSchemeToggle } from '@components';
import { LanguageSelector } from '@components';
import { RegisterButton } from '@auth/buttons';
import { useAppwrite } from '@appwrite';


function MainPage() {
	const { t } = useTranslation('common');
	const { account } = useAppwrite();
	const [ user, setUser ] = useState({});
	
	function login() {
		const email = 'test_user@email.provider';
		const pw = 'test_user@email.provider';
		account.createEmailSession(email, pw)
			.then(res => setUser({}))
			.catch(err => console.log(err))
	}

	function logout() {
		account.deleteSession('current')
			.then(res => setUser({}))
			.catch(err => console.log(err))
	}

	const result = Object.entries(user).map(entry => {
		return `${entry[0]}: ${entry[1]}`
	})
	
	useEffect(() => {
		account.get()
			.then(res => setUser(res as any))
			.catch(err => console.log(err))
	})

	return (
		<div>
			{t("debug.translations.locale")}
			
			<div style={{display: 'flex'}}>
				<ColorSchemeToggle />
				<LanguageSelector />
				<RegisterButton />
			</div>
			{/* <button onClick={login}>Log in</button>
			<button onClick={logout}>Log out</button> */}
			<div>
				{result.map(entry => <div>{entry}</div>)}
			</div>
		</div>
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