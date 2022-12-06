import { 
    TableRow, 
    Theme, 
    withStyles, 
    createStyles, 
    WithStyles,
    Tooltip,
    Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { ANIMATION, TABLES } from '../../material.theme'
import { ArchiveInvalidate } from '../../store/application/models/archive/archive.invalidate'
import Cell from '../table.utils/cell'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme),
    invalidCell: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.background.paper
    }
})

interface IProps extends WithTranslation {
    readonly item: ArchiveInvalidate
}

type IJoinProps = IProps & WithStyles<typeof Style>

export class ArchiveInvalidLineComponent extends Component<IJoinProps> {
    public render() {
        const {
            t,
            classes,
            item
        } = this.props

        return <TableRow
            key={`table_row_invalid_${item.table_index}`}
            className={classes.fadeIn1}>
            <Cell className={classes.tableCell}>
                <Tooltip title={`${t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.TOOLTIP')}`}>
                    <Typography>
                        {item.table_index}
                    </Typography>
                </Tooltip>
            </Cell>
            <Cell 
                className={
                    item.cd_uf_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.cd_uf_nf_aquis || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.cod_produto === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.cod_produto || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.descricao === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.descricao || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.ncm_produto === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.ncm_produto || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.gtin_ean === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.gtin_ean || ' - - '}
            </Cell>
        </TableRow>
    }
}

const ArchiveInvalidLineWithTranslation = withTranslation()(ArchiveInvalidLineComponent)

const ArchiveInvalidLine = withStyles<any>(Style)(ArchiveInvalidLineWithTranslation)

export default ArchiveInvalidLine
