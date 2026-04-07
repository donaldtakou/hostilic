import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Récupérer la locale depuis la requête
  let locale = await requestLocale;

  // S'assurer que la locale est valide
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  let messages;
  if (locale === 'en') {
    messages = (await import('../messages/en.json')).default;
  } else {
    messages = (await import('../messages/fr.json')).default;
  }

  return {
    locale,
    messages
  };
});
