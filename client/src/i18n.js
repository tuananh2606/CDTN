import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { cart_checkoutEN, homeEN, productEN, profileEN, commonEN, orderEN, adminEN } from './locales/en';
import { cart_checkoutVI, homeVI, productVI, profileVI, commonVI, orderVI, adminVI } from './locales/vi';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    ns: ['common', 'home', 'profile', 'product', 'cart_checkout', 'order', 'admin'],
    defaultNS: 'common',
    debug: true,
    detection: {
      order: ['localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        common: commonEN,
        home: homeEN,
        profile: profileEN,
        product: productEN,
        cart_checkout: cart_checkoutEN,
        order: orderEN,
        admin: adminEN,
      },
      vn: {
        common: commonVI,
        home: homeVI,
        profile: profileVI,
        product: productVI,
        cart_checkout: cart_checkoutVI,
        order: orderVI,
        admin: adminVI,
      },
    },
  });

export default i18n;
