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
import { Archive } from '../../store/application/models/archive/archive'


const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {
    readonly index: number
    readonly item: Archive
}

type IJoinProps = IProps & WithStyles<typeof Style>

export class ArchiveLineComponent extends Component<IJoinProps> {

    public render() {
        const {
            classes,
            index,
            item
        } = this.props

        return <TableRow
            key={`table_row_${index}`}
            className={classes.fadeIn1}>
            <Cell className={classes.tableCell}>
                <Typography variant="caption">
                    {item.cod_produto}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                <Typography variant="caption">
                    {item.ncm_produto}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                <Typography variant="caption">
                    {item.descricao}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                <Typography variant="caption">
                    {item.quantidade_entrada}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                <Typography variant="caption">
                    {item.quantidade_saida}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2}/>
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
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