import React from 'react';
import Lottie from 'lottie-react';
import { NextPageContext } from 'next';
import { Center } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getRequestAttributes } from '@server';
import notFoundLottie from 'public/404-lottie.json';


function MainPage() {
	const lottieProps = {
		loop: true,
		animationData: notFoundLottie,
		style: { 
			width: '50vh', 
			height: 'auto',
		},
	};

	return (
		<Center sx={{position: 'relative', height: '100%'}}>
			<Lottie {...lottieProps} /> 
		</Center>
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