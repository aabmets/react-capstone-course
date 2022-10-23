import React from 'react';
import { NextPageContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getRequestAttributes from '@server/getRequestAttributes';
import ColorSchemeToggle from 'src/features/ColorSchemeToggle/ColorSchemeToggle';
import LanguageSelector from 'src/features/LanguageSelector/LanguageSelector';

function MainPage() {
	const { t } = useTranslation('common');

	return (
		<div>
			{t("debug.translations.locale")}
			<ColorSchemeToggle />
			<LanguageSelector />
			<div></div>
		</div>
	)
}

export async function getServerSideProps({ req }: NextPageContext) {
	const { scheme, locale } = getRequestAttributes(req);
	const ts = await serverSideTranslations(
		locale, ['common', 'settings']
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