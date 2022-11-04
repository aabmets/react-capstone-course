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
		max_email_length: 25,
		max_password_length: 25,
		email_debounce_ms: 500,
		password_debounce_ms: 500,
		submit_delay_ms: 500,
	},
	other: {
		nav_progress_size: 4,
	}
}

export default siteConfig;