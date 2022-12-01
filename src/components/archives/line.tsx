import React, { Component } from 'react'
import { 
    createStyles, 
    TableRow, 
    Theme, 
    Typography, 
    withStyles, 
    WithStyles 
} from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'
import { ANIMATION, TABLES } from '../../material.theme'
import Cell from '../table.utils/cell'
import FormatCurrency from '../formatters/currency'


const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {
    readonly index: number
}

type IJoinProps = IProps & WithStyles<typeof Style>

export class ArchiveLineComponent extends Component<IJoinProps> {

    public render() {
        const {
            t,
            classes,
            index
        } = this.props

        return <TableRow
            key={`table_row_${index}`}
            className={classes.fadeIn1}>
            <Cell className={classes.tableHeader}>
                <Typography variant="caption">
                    9999999
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader}>
                <Typography variant="caption">
                    9999999
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader}>
                <Typography variant="caption">
                    PRODUCT DESCRIPTION
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader}>
                <Typography variant="caption">
                    999
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader}>
                <Typography variant="caption">
                    999
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableHeader}>
                <Typography variant="caption">
                    {' - - '}
                </Typography>
            </Cell>
        </TableRow>
    }
}

const ArchiveLineWithTranslation = withTranslation()(ArchiveLineComponent)

const ArchiveLine = withStyles<any>(Style)(ArchiveLineWithTranslation)

export default ArchiveLine