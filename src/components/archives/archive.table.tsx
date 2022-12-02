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
}

interface IState {
    readonly readLoading: boolean
}

type IJoinProps = IProps & WithStyles<typeof Style>

const INITIAL_STATE = {
    readLoading: false
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
            loading,
        } = this.props

        const {
            readLoading
        } = this.state

        console.log(readLoading)

        const stickyTop: number = 60

        return <Paper className={classes.paper}>

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
                                    component="label">
                                    {t('BUTTON.IMPORT.TITLE')}
                                    <input
                                        id="file-import"
                                        name="file-import"
                                        type="file"
                                        hidden={true}
                                        onChange={this.readFile}/>
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
                                        <b>Analisis</b>
                                    </Typography>
                                </Cell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                (!loading && !readLoading) && 
                                    archives?.map((item: Archive, index: number) => {
                                    return <ArchiveLine
                                        key={`archive_line_${index}`}
                                        index={index}
                                        item={item}/>
                                    })
                            }

                            {
                                (loading || readLoading) && (
                                    <TableRowLoading
                                        numberOfColumns={17}/>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*
                    (!loading && !archives.length) && (
                        <TableEmpty
                            message={t('TABLE.EMPTY')}
                            svg={DocNotFound}
                            svgSize="100px"
                            viewBox="0 0 460 430"/>
                    )
                */}
            </Box>
        </Paper>
    }

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

    private readFinished(): void {
        this.setState(INITIAL_STATE)
    }

    private readFile(e: any): void {
        this.setState({ readLoading: true })
        const allowedTypes: string[] = [
            'application/vnd.ms-excel', 
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]
        const file = e.target.files[0]
        if (file) {
            const { changeArchiveList } = this.props
            if (file && allowedTypes.includes(file.type)) {
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
                        console.log("empty")
                    } else {
                        const data = json.map(item => new Archive().fromJSON(item)) || []
                        changeArchiveList(data)
                        console.log(data)
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