export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark'
}

export const MAP_ENUM_THEME = {
    light: ThemeMode.LIGHT,
    dark: ThemeMode.DARK
}

const DEFAULT_THEME: any = {
    spacing: 10,
    palette: {
        primary: { main: '#50668F' },
        secondary: { main: '#afb2f3' },

        error: { main: '#A94442' },
        warning: { main: '#FF7043' },
        info: { main: '#165C73' },
        success: { main: '#50BB98' }
    },
    typography: {
        fontFamily: 'Roboto'
    }
}

const DARK_THEME: any = {
    ...DEFAULT_THEME,
    palette: {
        ...DEFAULT_THEME.palette,

        type: 'dark',

        text: {
            primary: '#FFFFFF'
        }
    }
}

const LIGHT_THEME = {
    ...DEFAULT_THEME,
    palette: {
        ...DEFAULT_THEME.palette,

        type: 'light',

        text: {
            primary: '#666666'
        }
    }
}

const CONFIG_THEME = {
    light: LIGHT_THEME,
    dark: DARK_THEME
}

export const ANIMATION = {
    '@keyframes fadeIn': {
        'from': {
            opacity: '0',
            transform: 'translate(0, -15px)'
        },
        'to': {
            opacity: '1',
            transform: 'translate(0, 0)'
        }
    },
    '@keyframes fadeInContent': {
        'from': {
            opacity: '0'
        },
        'to': {
            opacity: '1'
        }
    },
    fadeIn1: {
        animation: `$fadeIn 1s`
    },
    fadeIn2: {
        animation: `$fadeIn 2s`
    },
    fadeIn3: {
        animation: `$fadeIn 3s`
    },
    fadeInContent: {
        animation: `$fadeInContent 1.7s`
    }
}

export default CONFIG_THEME
