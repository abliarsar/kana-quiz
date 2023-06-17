import { languageStorageKey, Locale, locales } from './constants';

export const getDefaultLocale = (): Locale => {
  const fallback: Locale = 'ru';

  try {
    const localeKeys = Object.keys(locales) as Locale[];

    const previousLocale = localStorage.getItem(languageStorageKey) as Locale;
    if (localeKeys.includes(previousLocale)) return previousLocale;

      const defaultLocale = localeKeys.find(locale => navigator.languages?.includes(locale));
    return defaultLocale || fallback;
  }
  catch (e) {
    return fallback
  }

};

