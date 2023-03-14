import { Box, createStyles, Table, TableBody, TableContainer, TableHead, TableRow, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { ANIMATION, TABLES } from '../../../material.theme'
import { NfeItem } from '../../../store/application/models/protocol/nfe.item'
import { Protocol } from '../../../store/application/models/protocol/protocol'
import { IPaginator, ISearch } from '../../../store/ducks/root.types'
import Cell from '../../table.utils/cell'
import NfeLine from './line'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {
    readonly protocol: string
    readonly list: NfeItem[]
    readonly loading: boolean
    readonly paginator: IPaginator

    loadRequest(protocol: string, paginator?: IPaginator): void

    changePaginator(protocol: string, paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void
}

type IJoinProps = IProps & WithStyles<typeof Style>

class NfeTableComponent extends Component<IJoinProps> {

    /**
     * It is invoked immediately after a component is assembled (inserted into the tree).
     * @public
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @returns {void}
     */
    public componentDidMount(): void {
        const {
            protocol,
            paginator,
            loadRequest
        } = this.props
        loadRequest(protocol, paginator)
    }

    public render() {
        const {
            t,
            classes,
            list,
            loading
        } = this.props

        console.log(list)

        const stickyTop: number = 60

        return <Box className={classes.fadeInContent}>
            <TableContainer style={{ maxHeight: 'calc(100vh - 130px)' }}>
                <Table size="small" stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <Cell
                                className={classes.tableHeaderBordered}
                                rowSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.PRODUCT_COD')}</b>
                                </Typography>
                            </Cell>
                            <Cell
                                className={classes.tableHeaderBordered}
                                rowSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.NCM')}</b>
                                </Typography>
                            </Cell>
                            <Cell
                                className={classes.tableHeaderBordered}
                                rowSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.VEHICLE_CHASSIS')}</b>
                                </Typography>
                            </Cell>
                            <Cell
                                className={classes.tableHeaderBordered}
                                rowSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.DESCRIPTION')}</b>
                                </Typography>
                            </Cell>
                            <Cell
                                className={classes.tableHeaderBordered}
                                rowSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.TOTAL_RESTITUTION_DECLARED')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                colSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.ACQUISITION_DATA.TITLE')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                colSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.SELL_DATA.TITLE')}</b>
                                </Typography>
                            </Cell>
                            <Cell
                                className={classes.tableHeaderBordered}
                                colSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.CALCULATED.TITLE')}</b>
                                </Typography>
                            </Cell>
                            <Cell
                                className={classes.tableHeaderBordered}
                                rowSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.AUDITOR_ANALISIS')}</b>
                                </Typography>
                            </Cell>
                            <Cell
                                className={classes.tableHeaderBordered}
                                colSpan={2}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.ALERTS.TITLE')}</b>
                                </Typography>
                            </Cell>
                        </TableRow>

                        <TableRow>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                style={{
                                    position: 'sticky',
                                    top: `${stickyTop}`
                                }}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.ACQUISITION_DATA.VL_UNIT')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                style={{
                                    position: 'sticky',
                                    top: `${stickyTop}`
                                }}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.ACQUISITION_DATA.AMOUNT')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                style={{
                                    position: 'sticky',
                                    top: `${stickyTop}`
                                }}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.SELL_DATA.VL_UNIT')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                style={{
                                    position: 'sticky',
                                    top: `${stickyTop}`
                                }}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.SELL_DATA.AMOUNT')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                style={{
                                    position: 'sticky',
                                    top: `${stickyTop}`
                                }}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.CALCULATED.VL_UNIT')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                style={{
                                    position: 'sticky',
                                    top: `${stickyTop}`
                                }}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.CALCULATED.TOTAL_RESTITUTION_CALCULATED')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                style={{
                                    position: 'sticky',
                                    top: `${stickyTop}`
                                }}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.ALERTS.WRONG_NCM')}</b>
                                </Typography>
                            </Cell>
                            <Cell 
                                className={classes.tableHeaderBordered}
                                style={{
                                    position: 'sticky',
                                    top: `${stickyTop}`
                                }}>
                                <Typography>
                                    <b>{t('PROTOCOLS.DATA.TABLE_HEAD.ALERTS.WRONG_QUANTITY')}</b>
                                </Typography>
                            </Cell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            !loading &&
                            list
                                ?.map((item: NfeItem, index: number) => {
                                    return <NfeLine
                                        key={`table_row_${index}`}
                                        item={item}
                                        index={index}/>
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    }
}

const NfeTableWithTranslation = withTranslation()(NfeTableComponent)

const NfeTable = withStyles<any>(Style)(NfeTableWithTranslation)

export default NfeTable