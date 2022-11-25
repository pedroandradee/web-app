import React, { Component } from 'react'
import { Box, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import clsx from 'clsx'
import { withTranslation, WithTranslation } from 'react-i18next'

const Style = (theme: Theme) => createStyles({
    footer: {
        textAlign: 'center',
        flexShrink: 0,
        padding: theme.spacing(2)
    },
    textColor: {
        color: theme.palette.text.primary
    }
})

interface Props {
    className?: string
}

type IProps = Props & WithStyles<typeof Style> & WithTranslation

class Footer extends Component<IProps> {
    public render() {
        const { classes, className, t } = this.props
        const year = new Date().getFullYear()
        return <footer className={classes.footer}>
            <Box fontWeight="fontWeightBold" className={clsx(classes.textColor, className)}>
                © {year} {t('APP.TITLE')}
            </Box>
        </footer>
    }
}

const FooterWithTranslation = withTranslation()(Footer)

export default withStyles<any>(Style)(FooterWithTranslation)
