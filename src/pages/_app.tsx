import React from 'react';
import { Fragment, useState } from 'react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { ColorScheme, MantineThemeOverride } from '@mantine/core'; 
import { NotificationsProvider } from '@mantine/notifications';
import { RouterTransition } from '@components';
import { AppwriteProvider } from '@appwrite';
import { AppScaffold } from '@app-scaffold';
import { AllHeadTags } from '@head-tags';
import { cookies } from '@utils';
import siteConfig from 'site.config';


interface CustomPageProps {
	scheme: ColorScheme;
	locale: string;
}

function App({ Component, pageProps }: AppProps): JSX.Element {
	const props = pageProps as CustomPageProps;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(props.scheme);
	const theme = { ...siteConfig.theme, colorScheme } as MantineThemeOverride;

	function toggle() {
		const newScheme = colorScheme === 'light' ? 'dark' : 'light';
		cookies.setColorScheme(newScheme);
		setColorScheme(newScheme);
	}

	return (
		<Fragment>
			<AllHeadTags />
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggle}>
				<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
					<RouterTransition />
					<AppwriteProvider>
						<NotificationsProvider>
							<AppScaffold>
								<Component {...pageProps}/>
							</AppScaffold>
						</NotificationsProvider>
					</AppwriteProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</Fragment>
	);
}

export default appWithTranslation(App);