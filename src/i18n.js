import i18n from 'i18next';
import { initReactI18next,  } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

import translationEN from './locales/en/translations.json';
import translationRU from './locales/ru/translations.json';

const resources = {
    en: {
        translation: translationEN
    },
    de: {
        translation: translationRU
    }
};

// Путь к файлам переводов
const resourcesPath = './locales/{{lng}}/{{ns}}.json';

i18n
    .use(Backend) // Загрузчик переводов
    .use(LanguageDetector)
    .use(initReactI18next) // Инициализация react-i18next
    .init({
        resources,
        lng: 'en', // Язык по умолчанию
        fallbackLng: 'en', // Язык, который будет использоваться, если перевод отсутствует
        debug: true, // Включение режима отладки

        interpolation: {
            escapeValue: false, // React уже экранирует значения по умолчанию
        },

        backend: {
            loadPath: resourcesPath, // Путь к файлам переводов
        },
    });

export default i18n;