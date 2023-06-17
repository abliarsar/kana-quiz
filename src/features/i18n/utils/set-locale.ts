import { i18n } from '@lingui/core';

import { languageStorageKey, Locale } from '../utils/constants';

export async function setLocale(locale: Locale) {
  const { messages } = await import(`../../../locales/${locale}.po`);

  localStorage.setItem(languageStorageKey, locale)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

