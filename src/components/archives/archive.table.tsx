import React, { Component } from 'react'
import {
    Box,
    Button,
    createStyles,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Theme,
    Tooltip,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'
import * as XLSX from 'xlsx'
import { ANIMATION, TABLES } from '../../material.theme'
import { Archive } from '../../store/application/models/archive/archive'
import { IPaginator, ISearch } from '../../store/ducks/root.types'
import Cell from '../table.utils/cell'
import TableRowLoading from '../table.utils/table.row.loading'
import ArchiveLine from './line'
import { ArchiveInvalidate } from '../../store/application/models/archive/archive.invalidate'
import ArchiveTableInvalidDialog from './archive.table.invalid.dialog'
// import TableEmpty from '../table.utils/table.empty'

// import { ReactComponent as DocNotFound } from '../../assets/imgs/icons/custom/doc-not-found.svg'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme),
    paper: {
        width: '100%',
        padding: theme.spacing(1)
    },
    rowStyle: {
        cursor: 'pointer'
    }
})

interface IProps extends WithTranslation {
    readonly archives: Archive[]
    readonly invalidate: ArchiveInvalidate[]
    readonly dialog: boolean
    readonly loading: boolean
    readonly paginator: IPaginator

    changePaginator(paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void

    changeArchiveList(data: Archive[]): void

    changeInvalidateList(data: ArchiveInvalidate[]): void

    changeInvalidDialog(dialog: boolean): void

    resetList(): void
}

interface IState {
    readonly readLoading: boolean
    readonly empty: boolean
}

type IJoinProps = IProps & WithStyles<typeof Style>

const INITIAL_STATE = {
    readLoading: false,
    empty: false
}

class ArchiveTableComponent extends Component<IJoinProps, IState> {

    constructor(props: IJoinProps) {
        super(props)

        /* State */
        this.state = INITIAL_STATE

        /* Bind context */
        this.exportFile = this.exportFile.bind(this)
        this.readFile = this.readFile.bind(this)
        this.readFinished = this.readFinished.bind(this)
    }

    public render() {
        const {
            t,
            classes,
            archives,
            invalidate,
            loading,
            dialog,
            paginator,
            changeInvalidDialog,
            changePaginator
        } = this.props

        const {
            readLoading
        } = this.state

        const stickyTop: number = 60

        const {
            rows,
            page,

        } = paginator

        return <Paper className={classes.paper}>

            <ArchiveTableInvalidDialog
                invalidate={invalidate}
                dialog={dialog}
                changeInvalidDialog={changeInvalidDialog}
            />

            <Box pt={2}>
                <Box
                    display="flex"
                    alignItems="center"
                    p={0.5}>

                    <Box
                        display="flex"
                        style={{ gap: 5 }}
                        p={0.5}>
                        <Tooltip title={`${t('BUTTON.EXPORT.TOOLTIP')}`}>
                            <span>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    disabled={readLoading || loading}
                                    onClick={this.exportFile}>
                                    {t('BUTTON.EXPORT.TITLE')}
                                </Button>
                            </span>
                        </Tooltip>

                        <Tooltip title={`${t('BUTTON.IMPORT.TOOLTIP')}`}>
                            <span>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    disabled={readLoading || loading}
                                    component="label">
                                    {t('BUTTON.IMPORT.TITLE')}
                                    <input
                                        id="file-import"
                                        name="file-import"
                                        type="file"
                                        hidden={true}
                                        accept=".xlsx, .xls"
                                        onChange={(e) => this.readFile(e)}
                                        onClick={(e) => { e.currentTarget.value = "" }} />
                                </Button>
                            </span>
                        </Tooltip>
                    </Box>

                </Box>

                <TableContainer style={{ maxHeight: 'calc(100vh - 130px)' }}>
                    <Table size="small" stickyHeader={true} aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.PRODUCT_COD')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.NCM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.DESCRIPTION')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.TOTAL_COMPENSATE')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.TOTAL_COMPENSATE_CALCULATED')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.AMOUNT_INPUT')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.AMOUNT_OUTPUT')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    colSpan={3}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.TITLE')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    colSpan={3}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.DECLARED_VALUES_SALES.TITLE')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    colSpan={3}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.CALCULATED_VALUES.TITLE')}</b>
                                    </Typography>
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.AUDITORS_ANALISIS')}</b>
                                    </Typography>
                                </Cell>
                            </TableRow>

                            <TableRow>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MINIMUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MEDIUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MAXIMUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MINIMUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MEDIUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MAXIMUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MINIMUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MEDIUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED_MAXIMUM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{' - - '}</b>
                                    </Typography>
                                </Cell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                (!loading && !readLoading && invalidate?.length === 0) &&
                                archives
                                    ?.slice(page * rows, page * rows + rows)
                                    ?.map((item: Archive, index: number) => {
                                        return <ArchiveLine
                                            key={`archive_line_${index}`}
                                            index={index}
                                            item={item} />
                                    })
                            }

                            {
                                (loading || readLoading) && (
                                    <TableRowLoading
                                        numberOfColumns={17} />
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={paginator.totalRecords}
                    rowsPerPage={paginator.rows}
                    page={paginator.page}
                    onRowsPerPageChange={(e) => {
                        changePaginator({
                            ...paginator,
                            rows: Number(e.target.value)
                        })
                    }}
                    onPageChange={(e, current_page: number) => {
                        changePaginator({
                            ...paginator,
                            page: current_page
                        })
                    }}
                />

                {/*
                    (!loading && !readLoading && !archives.length) && (
                        <TableEmpty
                            message={t('TABLE.EMPTY')}
                            svg={DocNotFound}
                            svgSize="100px"
                            viewBox="0 0 460 430"/>
                    )
                */}
                {
                    (!loading && !readLoading && invalidate?.length > 0) &&
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        p={2}
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => changeInvalidDialog(true)}>
                        <Tooltip title={`${t('ARCHIVES.INVALID.TOOLTIP')}`}>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained">
                                {t('ARCHIVES.INVALID.SOME_ROW_WITH_EMPTY_CELL')}
                            </Button>
                        </Tooltip>
                    </Box>
                }
            </Box>
        </Paper>
    }

    /**
     * exports the base model to be filled
     */
    private exportFile(): void {
        // head columns(make the adjustments after check the model table)
        const headers: any[] = [new Archive().exportHeaders()]
        // work sheet
        const ws = XLSX.utils.aoa_to_sheet(headers)
        // work book
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
        XLSX.writeFile(wb, `Modelo_de_dados.xlsx`, { bookType: "xlsx", type: "buffer" })
    }

    /**
     * Set the current state to the initial state
     */
    private readFinished(): void {
        this.setState(INITIAL_STATE)
    }

    /**
     * pré-validations
     * check the table content(not empty)(ok)
     * check the table head
     * check the table values(check if the required variables are setted)(ok)
     * @param e event
     */
    private readFile(e: any): void {
        this.setState({ readLoading: true })
        const allowedTypes: string[] = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]
        const file = e.target.files[0]
        if (file) {
            const { changeArchiveList, changeInvalidateList, resetList } = this.props
            resetList()
            if (allowedTypes.includes(file.type)) {
                const fileReader = new FileReader()
                fileReader.readAsArrayBuffer(file)
                fileReader.onload = (item: any) => {
                    const aux = item.target.result
                    // read the buffer
                    const wb = XLSX.read(aux, { type: 'buffer' })
                    // gets the sheet name
                    const wsn = wb.SheetNames[0]
                    // getting the file data
                    const ws = wb.Sheets[wsn]
                    // converting data to json
                    const json: any[] = XLSX.utils.sheet_to_json(ws) || []
                    if (json.length === 0) {
                        this.setState({ empty: true })
                    } else {
                        const data: Archive[] = []
                        const invalid_items: ArchiveInvalidate[] = []
                        json.forEach((value: any, index: number) => {
                          
                            if (new Archive().invalidate(value)||new Archive().calculation_invalidation(value)) {
                                invalid_items.push(new ArchiveInvalidate().fromJSON({
                                    ...value,
                                    table_index: index + 2
                                }))
                               
                            }
                            /*else if (new Archive().calculation_invalidation(value)) {
                                invalid_items.push(new ArchiveInvalidate().fromJSON({
                                    ...value,
                                    table_index: index + 2
                                }))
                                //console.log('calculo invalido')
                            }*/
                            else {


                                data.push(new Archive().fromJSON({
                                    ...value
                                }))
                            }
                            return value
                        }
                        )


                        // console.log(data)

                        // values to be showed in this component
                        changeArchiveList(data)
                        // values to be showed in the invalid line, if exists
                        changeInvalidateList(invalid_items)
                    }
                }
            }
        }
        setTimeout(this.readFinished, 1000)
    }

}

const ArchiveTableWithTranslation = withTranslation()(ArchiveTableComponent)

const ArchiveTable = withStyles<any>(Style)(ArchiveTableWithTranslation)

export default ArchiveTable