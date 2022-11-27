import { 
    Box,
    createStyles, 
    InputAdornment, 
    TextField, 
    Theme, 
    Tooltip, 
    withStyles, 
    WithStyles 
} from "@material-ui/core"

import {
    Close as CloseIcon,
    Search as SearchIcon
} from '@material-ui/icons'

import { withTranslation, WithTranslation } from "react-i18next"
import { IPaginator, ISearch } from "../../store/ducks/root.types"

import React, { Component } from 'react'

const Style = (theme: Theme) => createStyles({
    spacingChip: {
        margin: `0px 2px`
    },
    spacingBtn: {
        margin: `0px ${theme.spacing(2)}px 0px 0px`
    },
    closeIcon: {
        cursor: 'pointer'
    }
})

/**
 * @private
 * @property {Array<string>} filters
 * @property {string} filterInit
 * @property {string} monthYear
 * @property {*} InitialStatePaginator
 * @property {boolean} havePeriod
 * @property {CompanyActions.changePaginator} changePaginator
 * @property {CompanyActions.changeSearchPaginator} changeSearchPaginator
 */
interface Props extends WithTranslation {
    readonly paginator: IPaginator

    changePaginator(paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void
}

/**
 * @private
 * @property {string} filterBy Variable that controls the filter
 * @property {boolean} popoverFilter Variable that controls the visibility of filtering options
 * @property {Element} [anchorEl] Controls where the element will appear on the screen
 */
interface IState {
    readonly popoverFilter: boolean
    readonly anchorEl: Element | undefined
}

type IJoinProps = Props & WithStyles<typeof Style>


class SearchComponent extends Component<IJoinProps, IState> {
    private searchTime: any

    constructor(props: IJoinProps) {
        super(props)

        /* Initial state */
        this.state = {
            popoverFilter: false,
            anchorEl: undefined
        }

        /* Bind context */
        this.handleFilterClick = this.handleFilterClick.bind(this)
        this.setSearchTime = this.setSearchTime.bind(this)
        this.cleansPaginator = this.cleansPaginator.bind(this)
    }

    public render() {
        const {
            t,
            classes, 
            paginator
        } = this.props

        return <Box>
            <Box display="flex" justifyContent="center" alignItems="end">
                <TextField
                    id="inp-filter"
                    fullWidth={true}
                    value={paginator?.search?.value || ''}
                    label={t('FILTERS.FILE_NAME')}
                    onChange={(e) => this.setSearchTime('filen_name', e)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Tooltip title={`${t('FILTERS.CLEAR_SEARCH')}`} placement="top">
                                <CloseIcon className={classes.closeIcon} onClick={this.cleansPaginator}/>
                            </Tooltip>
                            <SearchIcon/>
                        </InputAdornment>
                    }}/>
            </Box>
        </Box>
    }

    /**
     * Function that triggers popover visibility.
     * @param {any} event any
     * @returns {void}
     */
     private handleFilterClick(event: any): void {
        this.setState({ anchorEl: event?.currentTarget })
        this.setState({ popoverFilter: true })
    }

    /**
     * Function that triggers the search for a specific company.
     * @param {any} key any
     * @param {any} event any
     * @returns {void}
     */
    private setSearchTime(key: any, event: any): void {
        const { changePaginator, changeSearchPaginator, paginator } = this.props
        clearTimeout(this.searchTime)
        const value = event.target.value
        changeSearchPaginator({ key, value })
        this.searchTime = setTimeout(
            () => {
                changePaginator({
                    ...paginator,
                    search: {
                        key,
                        value
                    }
                })
            }, 500)
    }

    /**
     * Function that clears search fields.
     * @returns {void}
     */
    private cleansPaginator(): void {
        const { changePaginator, changeSearchPaginator, paginator } = this.props
        const key = ''
        const value = ''
        changeSearchPaginator({ key, value })
        if (paginator.search.key && paginator.search.value) {
            changePaginator({
                ...paginator,
                search: {
                    key,
                    value
                }
            })
        }
    }
}

const SearchComponentWithTranslation = withTranslation()(SearchComponent)

const Search = withStyles<any>(Style)(SearchComponentWithTranslation)

export default Search