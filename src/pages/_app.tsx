import { Fragment, useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import { MantineThemeOverride } from '@mantine/core';
import { ColorSchemeProvider } from '@mantine/core'; 
import { MantineProvider } from '@mantine/core';
import { ColorScheme } from '@mantine/core';
import { AppProps } from 'next/app';
import siteConfig from 'site.config';
import HeadTags from '@features/HeadTags';
import AppScaffold from 'src/features/AppScaffold/AppScaffold';
import * as cookies from '@utils/cookies';

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
			<HeadTags />
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggle}>
				<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
					<AppScaffold>
						<Component {...pageProps}/>
					</AppScaffold>
				</MantineProvider>
			</ColorSchemeProvider>
		</Fragment>
	);
}

export default appWithTranslation(App);