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
		defaultScheme: 'light'
	},
	language: {
		cookieName: 'language',
		...localeConfig.i18n
	},
	theme: {
		...DEFAULT_THEME,
		loader: 'dots',
		defaultRadius: 'md',
		primaryColor: 'blue',
		primaryShade: 4,
		activeStyles: {
			transform: 'translateY(0)'
		}
	}
}

export default siteConfig;