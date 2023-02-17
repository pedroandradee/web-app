import React, { Component } from 'react'
import {
    Box,
    Button,
    createStyles,
    InputBase,
    IconButton,
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
import { ANIMATION, TABLES } from '../../material.theme'
import { Archive } from '../../store/application/models/archive/archive'
import { IPaginator, ISearch } from '../../store/ducks/root.types'
import Cell from '../table.utils/cell'
import TableRowLoading from '../table.utils/table.row.loading'
import ProtocolLine from './line'


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
    readonly protocols: Archive[]
    readonly dialog: boolean
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

const MOCK = [
    { protocol: 123456, name: "Jose da Silva", send: "12/01/2023", status_av: "Deferido" },
    { protocol: 123457, name: "Maria Calvacante", send: "12/01/2023", status_av: "Indeferido" },
    { protocol: 123458, name: "Mateo Alvaro", send: "12/01/2023", status_av: "Pacialmente deferido" },
]

class ArchiveTableComponent extends Component<IJoinProps, IState> {

    constructor(props: IJoinProps) {
        super(props)

        /* State */
        this.state = INITIAL_STATE

    }

    public render() {
        const {
            t,
            classes,
            protocols,
            loading,
            dialog,
            paginator,
            changePaginator
        } = this.props


        const stickyTop: number = 60


        return <Paper className={classes.paper}>



            <Box pt={2}>
                <Box
                    display="flex"
                    alignItems="center"
                    p={0.5}>

                    <Box>
                        <TextField placeholder="Pesquisa" inputProps={{ 'aria-label': 'search google maps' }} />
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    <Box
                        display="flex"
                        style={{ gap: 5 }}
                        p={0.5}>
                        <Tooltip title={`${t('BUTTON.ADD.TOOLTIP')}`}>
                            <span>
                                <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => (alert("Novo"))}>
                                    {t('BUTTON.ADD.TITLE')}
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
                                        <b>{t('PROTOCOLS.TABLE_HEAD.#')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('PROTOCOLS.TABLE_HEAD.PROTOCOLS')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('PROTOCOLS.TABLE_HEAD.NAME')}</b>
                                    </Typography>
                                </Cell>
                                <Cell
                                    className={classes.tableHeader}
                                    rowSpan={2}>
                                    <Typography>
                                        <b>{t('PROTOCOLS.TABLE_HEAD.ASSESSMENT_STATUS')}</b>
                                    </Typography>
                                </Cell>


                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                MOCK
                                    //   ?.slice(page * rows, page * rows + rows)
                                    ?.map((item: any, index: number) => {
                                        return <ProtocolLine
                                            key={`protocol_line_${index}`}
                                            index={index}
                                            item={item}
                                        />
                                    })
                            }


                            {
                                (loading) && (
                                    <TableRowLoading
                                        numberOfColumns={6} />
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>



                {/*
                    (!loading && !readLoading && !protocols.length) && (
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





}

const ArchiveTableWithTranslation = withTranslation()(ArchiveTableComponent)

const ArchiveTable = withStyles<any>(Style)(ArchiveTableWithTranslation)

export default ArchiveTable