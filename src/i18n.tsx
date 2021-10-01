import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ptBR } from '@material-ui/core/locale'

import translationPT from './assets/locales/pt/translation.json'

export enum LanguageOptions {
    PT_BR = 'pt-BR'
}

export const MAP_ENUM_TO_LANGUAGE = {
    [LanguageOptions.PT_BR]: 'pt'
}

export const MAP_STRING_TO_ENUM_LANGUAGE = {
    'pt-BR': LanguageOptions.PT_BR
}


export const MAP_LANGUAGE_TO_ENUM = {
    'pt': [LanguageOptions.PT_BR]
}

export const MAP_ENUM_TO_LOCALE = {
    [LanguageOptions.PT_BR]: ptBR
}

const resources = {
    pt: {
        translation: translationPT
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: MAP_ENUM_TO_LANGUAGE[LanguageOptions.PT_BR],
        lng: MAP_ENUM_TO_LANGUAGE[LanguageOptions.PT_BR],
        interpolation: {
            escapeValue: false
        },
        react: {
            bindI18n: 'languageChanged'
        }
    })

export default i18n
