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
                                        {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.OTHERS')}
                                    </Cell>
                                    <Cell className={classes.tableHeader}>
                                        {t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.MOTIVE')}
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