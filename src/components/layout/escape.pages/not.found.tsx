import React, { Component, lazy } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Box, createStyles, Typography, withStyles, WithStyles } from '@material-ui/core'

import warningLogo from '../../../assets/imgs/escape.pages/warning.svg'

const EscapePage = lazy(() => import('./escape.component'))

export const Style = () => createStyles({
    image: {
        padding: 0,
        '& p': {
            fontSize: '40px',
            fontWeight: 'bold',
            marginTop: '-10px',
        }
    }
})

type Props = WithTranslation & WithStyles<typeof Style>

class NotFound extends Component<Props> {

    public render() {
        const { t, classes } = this.props

        const image = (
            <Box justifyContent="center" className={classes.image}>
                <img
                    src={warningLogo}
                    title={t('ESCAPE_PAGE.NOT_FOUND.TITLE')}
                    alt={t('ESCAPE_PAGE.NOT_FOUND.TITLE')}
                />
                <Typography color="secondary">404</Typography>
            </Box>
        )
        return <EscapePage
            image={image}
            title={t('ESCAPE_PAGE.NOT_FOUND.TITLE')}
            description={t('ESCAPE_PAGE.NOT_FOUND.DESCRIPTION')}/>
    }
}

const NotFoundWithTranslation = withTranslation()(NotFound)

export default withStyles<any>(Style, { withTheme: true })(NotFoundWithTranslation)
