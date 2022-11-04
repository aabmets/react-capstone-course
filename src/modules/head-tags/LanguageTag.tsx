import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';


function LanguageTag(): JSX.Element {
	const { i18n } = useTranslation();
	const lang = i18n.language;
	return (
		<Head>
			<meta httpEquiv="content-language" content={lang} />
			<link rel="alternate" hrefLang={lang} href="localhost:3000"/>
		</Head>
	);
}

export default LanguageTag;