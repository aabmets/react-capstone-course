// next-i18next.config.js

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'et'],
		localeDetection: false
	},
	defaultNS: 'common',
	localePath: './src/locales',
	reloadOnPrerender: process.env.NODE_ENV === 'development'
};