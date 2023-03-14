import React, { Component } from 'react'
import {
    Theme,
    createStyles,
    WithStyles,
    withStyles,
    Box,
} from '@material-ui/core'
import { ANIMATION, TABLES } from '../../../material.theme'
import { withTranslation, WithTranslation } from 'react-i18next'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {

}

type IJoinProps = IProps & WithStyles<typeof Style>

class ProductInformationDialogComponent extends Component<IJoinProps> {

    public render() {
        const {
            t,
            classes
        } = this.props
        return <Box>asd</Box>
    }
}

const ProductInformationDialogWithTranslation = withTranslation()(ProductInformationDialogComponent)

const ProductInformationDialog = withStyles<any>(Style)(ProductInformationDialogWithTranslation)

export default ProductInformationDialog