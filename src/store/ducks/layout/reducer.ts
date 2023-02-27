import { Reducer } from 'redux'
import { ILayoutState, LayoutTypes } from './types'
import { ThemeMode } from '../../../material.theme'
import i18n, { MAP_LANGUAGE_TO_ENUM } from '../../../i18n'

const INITIAL_STATE: ILayoutState = {
    appBar: {
        username: '',
        avatar: ''
    },
    language: MAP_LANGUAGE_TO_ENUM[i18n.language],
    breadCrumbLast: '',
    themeMode: ThemeMode.LIGHT,
    updateAvailable: false,
    registration: undefined
}

const reducer: Reducer<ILayoutState> = (state: ILayoutState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case LayoutTypes.CHANGE_COLOR:
            const { backgroundColor, iconColor } = action.payload
            return { ...state, appBar: { ...state.appBar, backgroundColor, iconColor } }

        case LayoutTypes.CHANGE_LANGUAGE:
            const { language } = action.payload
            return { ...state, language }

        case LayoutTypes.CHANGE_BREAD_CRUMB:
            const { breadCrumbLast } = action.payload
            return { ...state, breadCrumbLast }

        case LayoutTypes.CHANGE_USERNAME:
            const { username } = action.payload
            return { ...state, appBar: { ...state.appBar, username } }

        case LayoutTypes.CHANGE_AVATAR:
            const { avatar } = action.payload
            return { ...state, appBar: { ...state.appBar, avatar } }

        case LayoutTypes.CHANGE_THEME:
            const { themeMode } = action.payload
            return { ...state, themeMode }

        case LayoutTypes.UPDATE_AVAILABLE: 
            const { updateAvailable, registration } = action.payload
            return { ...state, updateAvailable, registration }

        default:
            return state
    }
}

export default reducer
