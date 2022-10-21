import { getCookie, setCookie } from 'cookies-next';
import siteConfig from 'site.config';

function getLongExpDate(): Date {
	const expDate = new Date();
	const fullYear = expDate.getFullYear();
	expDate.setFullYear(fullYear + 1);
	return expDate;
}

function getLanguage(): string {
	const { cookieName, locales, defaultLocale } = siteConfig.language;
	const locale = String(getCookie(cookieName));
	if (locales.includes(locale)) {
		return locale;
	} else {
		return defaultLocale;
	}
}

function setLanguage(locale: string): void {
	const { cookieName } = siteConfig.language;
	const options = { expires: getLongExpDate() };
	setCookie(cookieName, locale, options);
}

function getColorScheme(): string {
	const { cookieName, schemes, defaultScheme } = siteConfig.colorScheme;
	const scheme = String(getCookie(cookieName));
	if (schemes.includes(scheme)) {
		return scheme;
	} else {
		return defaultScheme;
	}
}

function setColorScheme(scheme: string): void {
	const { cookieName } = siteConfig.colorScheme;
	const options = { expires: getLongExpDate() };
	setCookie(cookieName, scheme, options);
}

export { 
	getLongExpDate,
	getLanguage,
	setLanguage,
	getColorScheme,
	setColorScheme
};