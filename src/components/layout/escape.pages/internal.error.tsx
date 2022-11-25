import React, { Component, lazy } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { History } from 'history'

import { Box, Typography, withStyles, WithStyles } from '@material-ui/core'

import settingsLogo from '../../../assets/imgs/escape.pages/settings.svg'
import { Style } from './not.found'

const EscapePage = lazy(() => import('./escape.component'))

interface IProperties {
    history: History
}

type Props = IProperties & WithTranslation & WithStyles<typeof Style>

class InternalError extends Component<Props> {

    public render() {
        const { t, classes } = this.props

        const image = (
            <Box justifyContent="center" className={classes.image}>
                <img
                    src={settingsLogo}
                    title={t('ESCAPE_PAGE.INTERNAL_ERROR.TITLE')}
                    alt={t('ESCAPE_PAGE.INTERNAL_ERROR.TITLE')}
                />
                <Typography color="secondary">ops...</Typography>
            </Box>
        )


        return <EscapePage
            image={image}
            title={t('ESCAPE_PAGE.INTERNAL_ERROR.TITLE')}
            description={t('ESCAPE_PAGE.INTERNAL_ERROR.DESCRIPTION')}
        />
    }
}

const InternalWithTranslation = withTranslation()(InternalError)

export default withStyles<any>(Style, { withTheme: true })(InternalWithTranslation)
