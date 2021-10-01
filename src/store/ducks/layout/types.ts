/**
 * Action types
 */

import { LanguageOptions } from '../../../i18n'
import { ThemeMode } from '../../../material.theme'
import { createTypes } from 'reduxsauce'

export const LayoutTypes = createTypes(`
    CHANGE_COLOR
    CHANGE_LANGUAGE
    CHANGE_USERNAME
    CHANGE_AVATAR    
    CHANGE_BREAD_CRUMB
    CHANGE_THEME  
`,
    {
        prefix: '@layout/'
    }
)

interface AppBarState {
    readonly username: string
    readonly avatar: string
}

/**
 * State type
 */
export interface ILayoutState {
    readonly appBar: AppBarState
    readonly language: LanguageOptions
    readonly breadCrumbLast: string
    readonly themeMode: ThemeMode
}
