import React, { Component, lazy } from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'
import clsx from 'clsx'
import { Box, Button, createStyles, Grid, Theme, withStyles, WithStyles } from '@material-ui/core'

import backgroundImage from '../../../assets/imgs/escape.pages/background.svg'
import { STYLE as SHARED_STYLE } from '../../../containers/auth/shared.style'
import { ThemeMode } from '../../../material.theme'
import { IApplicationState } from '../../../store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

const AuthWrapper = lazy(() => import('./wrapper'))
const WIDTH_CONTAINER = 360

interface Props extends RouteComponentProps<any> {
    readonly title: string
    readonly description: string
    readonly image: React.ReactNode
    readonly themeMode: ThemeMode
}

const Style = (theme: Theme) => createStyles({
    ...SHARED_STYLE(theme),
    root: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
    },
    content: {
        marginTop: '-25px'
    },
    paper: {
        backgroundColor: `rgba(255, 255, 255, .6)`,
        maxWidth: `${WIDTH_CONTAINER}px`,
        overflow: 'hidden',
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxWidth: `${WIDTH_CONTAINER - theme.spacing(2)}px`
        }
    },
    boxImage: {
        textAlign: 'center',
        '& img': {
            width: '120px',
            color: theme.palette.secondary.main
        }
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    description: {
        fontSize: '24px'
    },
    aux: {
        color: theme.palette.secondary.main,
        textAlign: 'center'
    },
    footerColor: {
        color: '#FFFFFF'
    }
})

type JoinProps = Props & WithTranslation & WithStyles<typeof Style>

class Escape extends Component<JoinProps, {}> {

    public render() {

        const {
            classes,
            t,
            title,
            description,
            image,
            history,
            themeMode
        } = this.props

        return <AuthWrapper
            title={t('AUTH.LOGIN.HELMET')}
            rootClass={classes.root}
            className={classes.paper}
            footerClassName={classes.footerColor}
            themeMode={themeMode}>
            <Grid className={classes.content}>

                <Box className={classes.boxImage} p={0}>
                    {image}
                </Box>

                <Box className={clsx(classes.title, classes.aux)} p={1}>
                    {title}
                </Box>

                <Box className={clsx(classes.description, classes.aux)} p={1}>
                    {description}
                </Box>

                <Box className={classes.aux} p={1}>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => history.push('/')}>
                        {t('BUTTON.HOME_PAGE')}
                    </Button>
                </Box>

            </Grid>

        </AuthWrapper>
    }
}

const EscapeWithTranslation = withTranslation()(Escape)

const EscapeWithStyle = withStyles<any>(Style, { withTheme: true })(EscapeWithTranslation)


const mapStateToProps = (state: IApplicationState) => ({
    themeMode: state.layout.themeMode
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EscapeWithStyle))
