import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { startNavigationProgress } from '@mantine/nprogress';
import { completeNavigationProgress } from '@mantine/nprogress';
import { NavigationProgress } from '@mantine/nprogress';
import siteConfig from 'site.config';


function RouterTransition() {
	const router = useRouter();

	useEffect(() => {
		const handleStart = (url: string) => 
			url !== router.asPath && startNavigationProgress();
		const handleComplete = () => 
			completeNavigationProgress();

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	});
	const size = siteConfig.other.nav_progress_size;
	return <NavigationProgress autoReset={true} size={size}/>;
}

export default RouterTransition;