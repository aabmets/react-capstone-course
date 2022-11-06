// General config for site-wide properties.

import { DEFAULT_THEME } from '@mantine/core';
import localeConfig from 'next-i18next.config';

const siteConfig = {
	meta: {
		title: 'Capstone Store',
		description: 'The Best Store for Capstone Products!',
		keywords: 'capstone, store, products',
		author: 'Mattias Aabmets',
	},
	colorScheme: {
		cookieName: 'color-scheme',
		schemes: ['light', 'dark'],
		defaultScheme: 'light',
	},
	language: {
		cookieName: 'language',
		...localeConfig.i18n,
	},
	theme: {
		...DEFAULT_THEME,
		loader: 'oval',
		defaultRadius: 'md',
		primaryColor: 'indigo',
		primaryShade: 7,
		fontFamily: 'Helvetica',
		activeStyles: {
			transform: 'translateY(0)',
		},
		white: '#fffefa',
	},
	auth: {
		maxEmailLength: 25,
		maxPasswordLength: 25,
		emailDebounceMsec: 500,
		passwordDebounceMsec: 500,
		formSubmitDelayMsec: 500,
		formSubmitTimeoutMsec: 10000,
		maxLatencyMsec: 1000,
	},
	other: {
		nav_progress_size: 4,
	}
}

export default siteConfig;