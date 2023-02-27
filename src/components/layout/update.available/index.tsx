import React, { Component } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import { bindActionCreators, Dispatch } from 'redux'
import { Box, Button, createStyles, Theme, Tooltip, Typography, withStyles, WithStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import * as LayoutActions from '../../../store/ducks/layout/actions'
import { IApplicationState } from '../../../store'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Alert, SnackBarMessageType } from '../snackbar'
import Loading from '../loading'

const Style = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        maxWidth: '250px'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '12px'
    },
    message: {
        fontSize: '12px'
    },
    updateBtn: {
        fontSize: 10,
        color: theme.palette.background.paper,
        borderColor: theme.palette.background.paper
    }
})

interface IProps extends WithStyles<typeof Style> {
    readonly open: boolean
    readonly registration: ServiceWorkerRegistration | undefined

    changeUpdateAvailable(updateAvailable: boolean, registration: ServiceWorkerRegistration | undefined): void
}

type Props = IProps & WithTranslation

interface State {
    readonly loading: boolean
}

class UpdateAvailableComponent extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.onClose = this.onClose.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.state = { loading: false }
    }

    public render() {
        const {
            open,
            classes,
            t
        } = this.props

        const { loading } = this.state

        let horizontal: any = 'right'
        let vertical: any = 'top'

        if (window?.innerWidth <= 360) {
            horizontal = 'center'
            vertical = 'bottom'
        }

        return <React.Fragment>

            <Snackbar
                open={open}
                autoHideDuration={60000}
                anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={this.onClose} severity={SnackBarMessageType.INFO}>
                    <Box className={classes.container}>

                        <Typography className={classes.title}>{t('APP.UPDATE_AVAILABLE')}</Typography>

                        <Box pt={0.5}>
                            <Tooltip title={`${t('BUTTON.UPDATE.TOOLTIP')}`}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.updateBtn}
                                    onClick={this.onUpdate}>
                                    {t('BUTTON.UPDATE.TITLE')}
                                </Button>
                            </Tooltip>
                        </Box>

                    </Box>
                </Alert>
            </Snackbar>

            {
                loading && (
                    <Loading/>
                )
            }

        </React.Fragment>
    }

    private onClose(): void {
        const { changeUpdateAvailable } = this.props
        changeUpdateAvailable(false, undefined)
    }

    private onUpdate(): void {
        const { registration } = this.props

        const registrationWaiting = registration?.waiting

        if (registrationWaiting) {
            this.setState({ loading: true })

            registrationWaiting?.postMessage({ type: 'SKIP_WAITING' })

            registrationWaiting?.addEventListener('statechange', (e: any) => {
                if (e?.target?.state === 'activated') {
                    window.location.reload()
                }
            })
        }

    }
}

const mapStateToProps = (state: IApplicationState) => ({
    open: state.layout.updateAvailable,
    registration: state.layout.registration
})

const UpdateAvailableWithTranslations = withTranslation()(UpdateAvailableComponent)

const UpdateAvailableWithStyle = withStyles<any>(Style)(UpdateAvailableWithTranslations)

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(LayoutActions, dispatch)

const UpdateAvailable = connect(mapStateToProps, mapDispatchToProps)(UpdateAvailableWithStyle)

export default UpdateAvailable
