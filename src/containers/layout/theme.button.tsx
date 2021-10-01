import React, { Component } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { IconButton, Tooltip } from '@material-ui/core'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Brightness4, Brightness7 } from '@material-ui/icons'

import * as ThemeActions from '../../store/ducks/layout/actions'
import { IApplicationState } from '../../store'
import { MAP_ENUM_THEME, ThemeMode } from '../../material.theme'
import localStorageService from '../../services/local.storage'

interface IProps {
    readonly themeMode: ThemeMode
    readonly color?: string

    changeTheme(themeMode: ThemeMode): void
}

type IJoin = IProps & WithTranslation

class ThemeButtonComponent extends Component<IJoin> {

    constructor(props: IJoin) {
        super(props)
        this.changeThemeMode = this.changeThemeMode.bind(this)
    }

    public componentDidMount() {
        const { changeTheme, themeMode } = this.props
        const themeModeLocal = localStorageService.getItem('themeMode')
        if (themeModeLocal && themeModeLocal !== themeMode) {
            changeTheme(MAP_ENUM_THEME[themeModeLocal])
        }
    }

    public render() {
        const { t, themeMode, color } = this.props
        return <React.Fragment>
            <Tooltip title={`${t('DEFAULT.CHANGE_THEME')}`}>
                <IconButton
                    id="btn_change_theme"
                    onClick={this.changeThemeMode}
                    style={{ color }}>
                    {themeMode === ThemeMode.LIGHT ? <Brightness4/> : <Brightness7/>}
                </IconButton>
            </Tooltip>
        </React.Fragment>
    }

    private changeThemeMode(): void {
        const { changeTheme, themeMode } = this.props
        themeMode === ThemeMode.LIGHT ? changeTheme(ThemeMode.DARK) : changeTheme(ThemeMode.LIGHT)
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    themeMode: state.layout.themeMode
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(ThemeActions, dispatch)

const ThemeButtonWithTranslation = withTranslation()(ThemeButtonComponent)

const ThemeButton = connect(mapStateToProps, mapDispatchToProps)(ThemeButtonWithTranslation)

export default ThemeButton
