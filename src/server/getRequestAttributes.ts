import { IncomingMessage } from 'http';
import { getCookie } from 'cookies-next';
import siteConfig from 'site.config';

type Request = IncomingMessage | undefined;

export default function getRequestAttributes(req: Request) {
	const scheme = getColorScheme(req);
	const locale = getLanguage(req);
	return { scheme, locale };
}

function getColorScheme(req: Request): string {
	const { cookieName, schemes, defaultScheme } = siteConfig.colorScheme;
	const cookie = String(getCookie(cookieName, { req }));
	if (schemes.includes(cookie)) {
		return cookie;
	} else {
		return defaultScheme;
	}
}

function getLanguage(req: Request): string {
	const { cookieName, locales, defaultLocale } = siteConfig.language;

	// Try cookies first.
	const c_locale = String(getCookie(cookieName, { req }));
	if (locales.includes(c_locale)) {
		return c_locale;
	}

	// Try headers next.
	const header = req?.headers['accept-language'];
	const arr = header?.split(',').join(';').split('-').join(';').split(';');
	for (const h_locale of arr || []) {
		if (locales.includes(h_locale)) {
			return h_locale;
		}
	}

	// If all else fails.
	return defaultLocale;
}