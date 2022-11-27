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
import TableLoading from '../table.utils/loading'
import TableEmpty from '../table.utils/table.empty'
import { ReactComponent as DocNotFound } from '../../assets/imgs/icons/custom/doc-not-found.svg'

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
}

type IJoinProps = IProps & WithStyles<typeof Style>

class ArchiveTableComponent extends Component<IJoinProps> {
    
    constructor(props: IJoinProps) {
        super(props)

        /* Bind context */
        this.exportFile = this.exportFile.bind(this)
        this.readFile = this.readFile.bind(this)
    }

    public render() {
        const {
            t,
            classes,
            archives,
            loading,
        } = this.props

        return <Paper className={classes.paper}>
            {/*<Box display="flex">
                <Box flexGrow={1} p={.5}>
                    <Search 
                        paginator={paginator}
                        changePaginator={changePaginator}
                        changeSearchPaginator={changeSearchPaginator}/>
                </Box>
            </Box>*/}

            <Box pt={2}>
                <Box
                    display="flex"
                    alignItems="center"
                    p={0.5}>
                    {/*<Box p={0.5}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="checkbox_select_all"
                                    checked={
                                        false
                                    }
                                    disabled={archives.length === 0}
                                    color="primary"
                                    onChange={(e: any) => {
                                        console.log("changing")
                                    }}/>
                            }
                            label={`${t('BUTTON.REMOVE.SELECT_ALL')}`}/>
                        <Tooltip title={`${t('BUTTON.REMOVE.REMOVE_SELECTED.TOOLTIP')}`}>
                            <span>
                                <Button
                                    size="small"
                                    color="primary"
                                    disabled={false}
                                    onClick={() => console.log("removing")}>
                                    {t('BUTTON.REMOVE.REMOVE_SELECTED.TITLE')}
                                </Button>
                            </span>
                        </Tooltip>

                    </Box>*/}

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

                <TableContainer>
                    <Table size="small" stickyHeader={true} aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <Cell className={classes.tableHeader} width="100px">
                                    <Typography align="center">
                                        #
                                    </Typography>
                                </Cell>
                                <Cell className={classes.tableHeader}>
                                    <Typography align="center">
                                        <b>{t('ARCHIVES.TABLE_HEAD.FILE_NAME')}</b>
                                    </Typography>
                                </Cell>
                                <Cell className={classes.tableHeader} width="140px">
                                    <Typography align="center">
                                        <b>{t('ARCHIVES.TABLE_HEAD.ACTIONS')}</b>
                                    </Typography>
                                </Cell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                !loading && archives
                                    ?.map((item: Archive, index: number) => {
                                        return <TableRow
                                            key={index}
                                            className={classes.rowStyle}
                                            onClick={() => 
                                                console.log("show file content")
                                            }>
                                            <Cell className={classes.tableCell}>{item.id}</Cell>
                                            <Cell className={classes.tableCell}>test</Cell>
                                        </TableRow>
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                {
                    loading && (
                        <TableLoading
                            withIcon={false}
                            withMessage={false}
                            message={t('TABLE.LOADING')}/>
                    )
                }
                {
                    (!loading && !archives.length) && (
                        <TableEmpty
                            message={t('TABLE.EMPTY')}
                            svg={DocNotFound}
                            svgSize="100px"
                            viewBox="0 0 460 430"/>
                    )
                }
            </Box>
        </Paper>
    }

    private exportFile(): void {
        // head columns(make the adjustments after check the model table)
        const headers: any[] = [['col1', 'col2']]
        // work sheet
        const ws = XLSX.utils.aoa_to_sheet(headers)
        // work book
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws)
        XLSX.writeFile(wb, `Modelo_de_dados.xlsx`, { type: 'array', bookType: 'xlsx' })
        setTimeout(() => console.log("asd"), 1000)
    }

    private readFile(e: any): void {
        const allowedTypes: string[] = [
            'application/vnd.ms-excel', 
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]
        const file = e.target.files[0]
        if (file) {
            if (file && allowedTypes.includes(file.type)) {
                const fileReader = new FileReader()
                fileReader.readAsArrayBuffer(file)
                fileReader.onload = (item: any) => {
                    const aux = item.target.result
                    // read the buffer
                    const wb = XLSX.read(aux, { type: 'buffer' })
                    // file name
                    const wsn = wb.SheetNames[0]
                    // getting the file data
                    const ws = wb.Sheets[wsn]
                    // converting data to json
                    const json = XLSX.utils.sheet_to_json(ws)
                    console.log(json)
                }
            }
        }
    }
}

const ArchiveTableWithTranslation = withTranslation()(ArchiveTableComponent)

const ArchiveTable = withStyles<any>(Style)(ArchiveTableWithTranslation)

export default ArchiveTable