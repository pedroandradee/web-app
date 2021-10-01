import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { withTranslation, WithTranslation } from 'react-i18next'
import { bindActionCreators, Dispatch } from 'redux'

import { history, IApplicationState } from './store'
import CONFIG_THEME, { ThemeMode } from './material.theme'
import { LanguageOptions, MAP_ENUM_TO_LANGUAGE, MAP_ENUM_TO_LOCALE, MAP_STRING_TO_ENUM_LANGUAGE } from './i18n'
import * as LayoutActions from './store/ducks/layout/actions'
import { CssBaseline } from '@material-ui/core'
import SnackbarComponent from './components/snackbar'
import Routes from './routes'
import ErrorBoundary from './components/error.boundary'
import localStorageService from './services/local.storage'

interface Props {
    readonly language: LanguageOptions
    readonly themeMode: ThemeMode

    changeLanguage(language: LanguageOptions): void

    changeTheme(themeMode: ThemeMode): void
}

type IJoinProps = Props & WithTranslation

class ThemeProviderComponent extends Component<IJoinProps> {

    constructor(props: IJoinProps) {
        super(props)
        this.setLanguage = this.setLanguage.bind(this)
        const localLanguage: LanguageOptions = MAP_STRING_TO_ENUM_LANGUAGE[localStorageService.getItem('language')]
        if (localLanguage) {
            this.setLanguage(localLanguage)
        }
    }

    public componentDidUpdate(prevProps: Readonly<IJoinProps>, prevState: Readonly<{}>, snapshot?: any): void {
        const { language } = this.props
        if (language !== prevProps.language) {
            this.setLanguage(language)
        }
    }

    public render() {
        const {
            language,
            themeMode
        } = this.props

        return <ThemeProvider theme={createTheme(CONFIG_THEME[themeMode], MAP_ENUM_TO_LOCALE[language])}>
            <ErrorBoundary>
                <CssBaseline/>
                <SnackbarComponent/>
                <Routes history={history}/>
            </ErrorBoundary>
        </ThemeProvider>
    }

    private setLanguage(language: LanguageOptions): void {
        this.props.i18n.changeLanguage(MAP_ENUM_TO_LANGUAGE[language])
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    language: state.layout.language,
    themeMode: state.layout.themeMode
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(LayoutActions, dispatch)

const ThemeWithTranslation = withTranslation()(ThemeProviderComponent)

export default connect(mapStateToProps, mapDispatchToProps)(ThemeWithTranslation)
