import React, { Component } from 'react'
import { Box, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'

import { ANIMATION } from '../../material.theme'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    fullWidth: {
        width: '100%'
    },
    boxCard: {
        maxWidth: '740px',
        padding: theme.spacing(0.5),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0)
        }
    },
    boxCardLists: {
        width: '100%',
        margin: theme.spacing(-0.5),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(0)
        }
    }
})

type IJoinProps = WithTranslation & WithStyles<typeof Style, true>

class HomePageComponent extends Component<IJoinProps> {

    public render() {
        const {
            t,
            classes
        } = this.props

        return <Box className={classes.fadeIn1}>

            <Helmet>
                <title>
                    {t('NAVIGATION_TAB.HOME')}
                </title>
            </Helmet>

        </Box>
    }
}

const HomePageWithTranslation = withTranslation()(HomePageComponent)

const HomePage = withStyles<any>(Style, { withTheme: true })(HomePageWithTranslation)

export default HomePage
