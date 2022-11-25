import React, { Component } from 'react'

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { bindActionCreators, Dispatch } from 'redux'
import { Box, createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import * as SnackBarActions from '../../../store/ducks/snack.bar/actions'
import { IApplicationState } from '../../../store'
import { WithTranslation, withTranslation } from 'react-i18next'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

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
    }
})

interface IProps extends WithStyles<typeof Style> {
    readonly open: boolean
    readonly title: string
    readonly message: string
    readonly type: SnackBarMessageType

    close(): void
}

type Props = IProps & WithTranslation

class SnackbarComponent extends Component<Props> {

    public render() {
        const {
            close,
            open,
            message,
            title,
            type,
            classes,
            t
        } = this.props

        let horizontal: any = 'right'
        let vertical: any = 'top'

        if (window?.innerWidth <= 360) {
            horizontal = 'center'
            vertical = 'bottom'
        }

        return <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={close}
            anchorOrigin={{ vertical, horizontal }}
        >
            <Alert onClose={close} severity={type}>
                <Box className={classes.container}>
                    {
                        !!title && <Typography className={classes.title}>{t(title)}</Typography>
                    }
                    {
                        !!message && <Typography className={classes.message}>{t(message)}</Typography>
                    }
                </Box>
            </Alert>
        </Snackbar>
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    open: state.snackBar.open,
    title: state.snackBar.title,
    message: state.snackBar.message,
    type: state.snackBar.type
})

const SnackBarWithTranslations = withTranslation()(SnackbarComponent)

const SnackBarWithStyle = withStyles<any>(Style, { withTheme: true })(SnackBarWithTranslations)

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    { close: SnackBarActions.close },
    dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarWithStyle)

export enum SnackBarMessageType {
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
    SUCCESS = 'success'
}
