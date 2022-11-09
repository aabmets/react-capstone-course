import { IncomingMessage } from 'http';
import { getCookie } from 'cookies-next';
import siteConfig from 'site.config';


type Request = IncomingMessage | undefined;

function getRequestAttributes(req: Request) {
	const scheme = _getColorScheme(req);
	const locale = _getLanguage(req);
	return { scheme, locale };
}

function _getColorScheme(req: Request): string {
	const { cookieName, schemes, defaultScheme } = siteConfig.colorScheme;
	const cookie = String(getCookie(cookieName, { req }));
	if (schemes.includes(cookie)) {
		return cookie;
	} else {
		return defaultScheme;
	}
}

function _getLanguage(req: Request): string {
	const { cookieName, locales, defaultLocale } = siteConfig.language;

	const c_locale = String(getCookie(cookieName, { req }));
	if (locales.includes(c_locale)) {
		return c_locale;
	}
	const header = req?.headers['accept-language'];
	const localeArray = header?.split(/[,-;]+/);
	for (const h_locale of localeArray || []) {
		if (locales.includes(h_locale)) {
			return h_locale;
		}
	}
	return defaultLocale;
}

export default getRequestAttributes;