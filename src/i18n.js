import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';

i18n
	.use(LanguageDetector) // Kullanıcının dilini algılar
	.use(initReactI18next) // React entegrasyonu
	.init({
		resources: {
			en: { translation: translationEN },
			tr: { translation: translationTR },
		},
		fallbackLng: 'en', // Varsayılan dil
		interpolation: {
			escapeValue: false, // React için gerekli
		},
	});

export default i18n;
