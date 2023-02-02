import {
    createStyles,
    Dialog,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    withStyles,
    WithStyles
} from '@material-ui/core'
import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { ANIMATION, TABLES } from '../../material.theme'
import { ArchiveInvalidate } from '../../store/application/models/archive/archive.invalidate'
import Cell from '../table.utils/cell'
import ArchiveInvalidLine from './line.invalid'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {
    readonly invalidate: ArchiveInvalidate[]
    readonly dialog: boolean

    changeInvalidDialog(dialog: boolean): void
}

type IJoinProps = IProps & WithStyles<typeof Style>

export class ArchiveTableInvalidDialogComponent extends Component<IJoinProps> {
    public render() {

        const {
            t,
            classes,
            invalidate,
            dialog,
            changeInvalidDialog
        } = this.props

        return <Dialog
            id="dialog_invalid_items"
            onClose={() => changeInvalidDialog(false)}
            fullWidth={true}
            maxWidth="lg"
            open={dialog}>
            <DialogTitle id="dialog_invalid_items_title">
                <b>{t('ARCHIVES.INVALID.DIALOG.TITLE')}</b>
            </DialogTitle>
            <DialogContent id="dialog_invalid_items_content">
                <TableContainer style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    <Table size="small" stickyHeader={true} aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.INDEX')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.UF')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.COD')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.DESCRIPTION')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.NCM')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.GTIN_EAN')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.NUM_ITEM_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.ENTRY_ALIOT')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.DTA_EMISS_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.NUM_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.NUM_CHV_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.INPUT_SERIE')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.INPUT_QUANTITY')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_UNIT_PROD_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_BC_ICMS_OP_PROP_PROD_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_ICMS_OP_PROP_PROD_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.TIPO_BC_ICMS_ST_PROD_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_PAUTA_ICMS_ST_PROD')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.PERC_MVA_PROD')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_BC_ICMS_ST_PROD_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_ICMS_ST_ITEM_NF_AQUIS')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.NUM_NF_SAIDA')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.DTA_EMISS_NF_SAIDA')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_ALQ_ICMS_ST_PROD_OPER_SAIDA')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.OUTPUT_QUANTITY')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.NUM_ITEM_NF_SAIDA')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.ITEM_PRODUCT_DESCRIPTION')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_UNIT_PROD_NF_SAIDA')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_DESC_PROD_NF_SAIDA')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.UNIT_SALES_AMOUNT_PRESUMED')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.UNIT_SALES_AMOUNT_ASSUMED_X_OUTPUT_QTY')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_BC_ICMS_ST_PROD_NF_SAIDA')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.AMOUNT_BALANCE')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.ST_UNIT_BALANCE')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.SALDO_ST_TOTAL')}
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.VL_RESSAR_ICMS_ST_PROD')}
                                </Cell>
                               
                                <Cell className={classes.tableHeader}>
                                    {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.OTHERS')}
                                </Cell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                invalidate?.map((item: ArchiveInvalidate, index: number) => {
                                    return <ArchiveInvalidLine
                                        key={index}
                                        item={item}
                                    />
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    }
}

const ArchiveTableInvalidDialogWithTranslation = withTranslation()(ArchiveTableInvalidDialogComponent)

const ArchiveTableInvalidDialog = withStyles<any>(Style)(ArchiveTableInvalidDialogWithTranslation)

export default ArchiveTableInvalidDialog