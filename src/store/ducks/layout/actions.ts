import { action } from 'typesafe-actions'
import { LayoutTypes } from './types'
import { LanguageOptions } from '../../../i18n'
import localStorageService from '../../../services/local.storage'
import { ThemeMode } from '../../../material.theme'

export const changeAppBarColors = (backgroundColor: string, iconColor: string) => action(
    LayoutTypes.CHANGE_COLOR,
    { backgroundColor, iconColor }
)

export const changeLanguage = (language: LanguageOptions) => {
    localStorageService.setItem('language', language)
    return action(LayoutTypes.CHANGE_LANGUAGE, { language })
}

export const changeBreadCrumbLast = (breadCrumbLast: string | undefined) => action(LayoutTypes.CHANGE_BREAD_CRUMB, { breadCrumbLast })

export const changeUsername = (username: string) => {
    localStorageService.setItem('username', username)
    return action(LayoutTypes.CHANGE_USERNAME, { username })
}

export const changeAvatar = (avatar) => {
    localStorageService.setItem('avatar', avatar)
    return action(LayoutTypes.CHANGE_AVATAR, { avatar })
}

export const changeTheme = (themeMode: ThemeMode) => {
    localStorageService.setItem('themeMode', themeMode)
    return action(LayoutTypes.CHANGE_THEME, { themeMode })
}

