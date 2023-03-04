import React, { Component } from 'react'
import {
    Box,
    Button,
    createStyles,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Theme,
    Tooltip,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import { withTranslation, WithTranslation } from 'react-i18next'
import * as XLSX from 'xlsx'
import { ANIMATION, TABLES } from '../../../material.theme'
import { Archive } from '../../../store/application/models/archive/archive'
import { IPaginator, ISearch } from '../../../store/ducks/root.types'
import Cell from '../../table.utils/cell'
import TableRowLoading from '../../table.utils/table.row.loading'
import GeneralConsultationLine from './line'
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
    readonly loading: boolean
    readonly paginator: IPaginator

    changePaginator(paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void

    changeArchiveList(data: Archive[]): void

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

class GeneralConsultationTableComponent extends Component<IJoinProps, IState> {

    constructor(props: IJoinProps) {
        super(props)

        /* State */
        this.state = INITIAL_STATE

        /* Bind context */
        this.readFile = this.readFile.bind(this)
        this.readFinished = this.readFinished.bind(this)
    }

    public render() {
        const {
            t,
            classes,
            archives,
            loading,
            paginator,
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

            <Box pt={2}>
                <Box
                    display="flex"
                    justifyContent="space-between" 
                    alignItems="flex-end">
                    <Box p={0.5}>
                        <Typography>
                            <b> Contribuente: Jose da silva</b>
                        </Typography>
                        <Typography>
                            <b>Pedido de inclusão</b>
                        </Typography>
                    </Box>
                    <Box p={0.5}>
                        <Typography>
                            <b>Mes referencia</b>
                        </Typography>
                        <Typography>
                            <b>Situação</b>
                        </Typography>
                    </Box>
                    <Box display="flex">
                        <TextField
                            id="search-text"
                            placeholder="Pesquisa"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => {

                                console.log(e)
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    p={0.5}>

                    <Box
                        display="flex"
                        style={{ gap: 5 }}
                        p={0.5}>
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
                                    colSpan={4}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.PRODUCT_DATA.TITLE')}</b>
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
                                    colSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.TITLE')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    colSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.DECLARED_VALUES_SALES.TITLE')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    colSpan={1}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.CALCULATED_VALUES.TITLE')}</b>
                                    </Typography>
                                </Cell>
                                <Cell className={classes.tableHeader}
                                    colSpan={1}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.AUDITORS_ANALISIS')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    colSpan={2}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.ALERT.TITLE')}</b>
                                    </Typography>
                                </Cell>
                            </TableRow>

                            <TableRow>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.PRODUCT_DATA.PRODUCT_COD')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.PRODUCT_DATA.NCM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.PRODUCT_DATA.CHASSI_VEHICLE')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.PRODUCT_DATA.DESCRIPTION')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.UNITARY_VALUE_PRESUMED')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.INPUT_DECLARED_VALUES.AMOUNT')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.DECLARED_VALUES_SALES.UNITARY_VALUE_PRESUMED')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.DECLARED_VALUES_SALES.AMOUNT_OUTPUT')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.CALCULATED_VALUES.UNITARY_VALUE_PRESUMED')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.ALERT.DIVERGENT_NCM')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    style={{ position: 'sticky', left: 0, top: `${stickyTop}px` }}>
                                    <Typography>
                                        <b>{t('ARCHIVES.TABLE_HEAD.ALERT.SMALLER_AMOUNT')}</b>
                                    </Typography>
                                </Cell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                (!loading && !readLoading /*&& invalidate?.length === 0*/) &&
                                archives
                                    ?.slice(page * rows, page * rows + rows)
                                    ?.map((item: Archive, index: number) => {
                                        return <GeneralConsultationLine
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
                    (!loading && !readLoading /*&& invalidate?.length > 0*/) &&
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        p={2}
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => alert("oi")/*changeInvalidDialog(true)*/}>
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
            const { 
                changeArchiveList, 
                // changeInvalidateList, 
                resetList } = this.props
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
                        json.forEach((value: any, index: number) => {

                              /*if (new Archive().invalidate(value) || new Archive().calculation_invalidation(value)) {
                                invalid_items.push(new ArchiveInvalidate().fromJSON({
                                    ...value,
                                    table_index: index + 2
                                }))

                            }
                          else if (new Archive().calculation_invalidation(value)) {
                                invalid_items.push(new ArchiveInvalidate().fromJSON({
                                    ...value,
                                    table_index: index + 2
                                }))
                                //console.log('calculo invalido')
                            }
                            else {*/


                             data.push(new Archive().fromJSON({
                                    ...value
                                }))
                           // }
                            return value
                        }
                        )


                        // console.log(data)

                        // values to be showed in this component
                        changeArchiveList(data)
                        // values to be showed in the invalid line, if exists
                        // changeInvalidateList(invalid_items)
                    }
                }
            }
        }
        setTimeout(this.readFinished, 1000)
    }

}

const GeneralConsultationTableWithTranslation = withTranslation()(GeneralConsultationTableComponent)

const GeneralConsultationTable = withStyles<any>(Style)(GeneralConsultationTableWithTranslation)

export default GeneralConsultationTable