import React, { Component } from 'react'

import { ErrorMessage } from 'formik'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'

const Style = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        textAlign: 'center',
        color: theme.palette.error.main,
        padding: theme.spacing(1)
    }
})

interface IProps extends WithStyles<typeof Style> {
    readonly name: string
}

type Props = IProps & WithTranslation

class FormErrorMessage extends Component<Props> {

    public response(name: string): any {
        return <ErrorMessage name={name} component="span"/>
    }

    public render() {
        const { name, classes, t } = this.props
        return (
            <div className={classes.root} id={`div_error_${name}`}>
                &ensp;<ErrorMessage name={name} render={msg => <span id={`message_error_${name}`}>{t(`${msg}`)}</span>}/>
            </div>
        )
    }
}

const FormErrorMessageWithTranslation = withTranslation()(FormErrorMessage)

export default withStyles<any>(Style)(FormErrorMessageWithTranslation)
