import React, { Component } from 'react'
import {
    Box,
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
import { ANIMATION, TABLES } from '../../../material.theme'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Protocol } from '../../../store/application/models/protocol/protocol'
import { IPaginator, ISearch } from '../../../store/ducks/root.types'
import clsx from 'clsx'
import Cell from '../../table.utils/cell'
import TableLoading from '../../loading'
import TableEmpty from '../../table.utils/table.empty'
import { ReactComponent as DocumentNotFound } from '../../../assets/imgs/icons/custom/doc-not-found.svg'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Search } from '@material-ui/icons'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme),
    paper: {
        width: '100%',
        padding: theme.spacing(1)
    },
    spacingBtn: {
        margin: `0px ${theme.spacing(2)}px 0px 0px`
    },
    spacingChip: {
        margin: `0px ${theme.spacing(1)}px`
    },
    styleRow: {
        cursor: 'pointer'
    }
})

interface IProps extends RouteComponentProps {
    readonly protocols: Protocol[]
    readonly loading: boolean
    readonly paginator: IPaginator

    loadRequest(paginator?: IPaginator): void

    changePaginator(paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void
}

type IJoinProps = IProps & WithTranslation & WithStyles<typeof Style>

class TableProtocolComponent extends Component<IJoinProps> {

    constructor(props: IJoinProps) {
        super(props)

        /* Bind Context */
        this.loadProtocols = this.loadProtocols.bind(this)
     
    }

    /**
     * It is invoked immediately after a component is assembled (inserted into the tree).
     * @public
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @returns {void}
     */
    public componentDidMount(): void {
        this.loadProtocols()
    }

    public render() {
        const {
            t,
            classes,
            protocols,
            loading,
            paginator,
            history,
            changePaginator
        } = this.props

        return <Paper className={clsx(classes.paper, classes.fadeIn2)}>
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

            <Box pt={2}>
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
                                !loading && (
                                    protocols?.map((item: Protocol, index: number) => {

                                        return <Tooltip
                                            key={`table_row_${index}`}
                                            title={`${t('TABLE.VIEW_DETAILS')}`}
                                            placement="top">
                                            <TableRow
                                                className={classes.styleRow}
                                                onClick={() =>
                                                     history.push(`/app/protocols/${item.protocol}`)
                                                    //  console.log(`/app/protocols/${item.protocol}`)
                                                }>
                                                <Cell
                                                    className={classes.tableCell}
                                                    width="50px">
                                                    <Typography variant="caption">
                                                        {index + 1 || ' - - '}
                                                    </Typography>
                                                </Cell>
                                                <Cell className={classes.tableCell}>
                                                    <Typography variant="caption">
                                                        {item.protocol || ' - - '}
                                                    </Typography>
                                                </Cell>
                                                <Cell className={classes.tableCell}>
                                                    <Typography variant="caption">
                                                        {item.name || ' - - '}
                                                    </Typography>
                                                </Cell>
                                                <Cell className={classes.tableCell}>
                                                    <Typography variant="caption">
                                                        {item.status_av || ' - - '}
                                                    </Typography>
                                                </Cell>
                                            </TableRow>
                                        </Tooltip>
                                    })

                                )

                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                {
                    loading && (
                        <TableLoading
                            withIcon={true}
                            withMessage={true}
                            message={t('TABLE.LOADING')} />
                    )
                }
                {
                    (!protocols?.length && !loading) && (
                        <TableEmpty
                            message={t('TABLE.EMPTY')}
                            svg={DocumentNotFound}
                            svgSize="100px"
                            viewBox="0 0 460 430" />
                    )
                }

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
                    onPageChange={(e, page: number) => {
                        changePaginator({
                            ...paginator,
                            page
                        })
                    }} />
            </Box>
        </Paper>
    }

    private loadProtocols(): void {
        const { paginator, loadRequest } = this.props
        loadRequest(paginator)
    }
}

const TableProtocolWithTranslation = withTranslation()(TableProtocolComponent)

const TableProtocols = withRouter(withStyles<any>(Style)(TableProtocolWithTranslation))

export default TableProtocols