import { action } from 'typesafe-actions'
import { Archive } from '../../application/models/archive/archive'
import { ArchiveInvalidate } from '../../application/models/archive/archive.invalidate'
import { IAxiosResponse, IPaginator, ISearch } from '../root.types'
import { ArchiveTypes } from './types'

/**
 * <h5>Functions that trigger actions referring to archives.</h5>
 * @see {@link https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions}
 * @typedef ArchiveActions
 * @namespace ArchiveActions
 * @category React
 * @subcategory Redux / Actions
 */

/**
 * Action that triggers the reset of the list of archives.
 * @memberof ArchiveActions
 * @alias ArchiveActions.resetList
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const resetList = () => action(ArchiveTypes.RESET_LIST)

/**
 * Action that triggers the change of page of the list of archives.
 * @memberof ArchiveActions
 * @alias ArchiveActions.changePaginator
 * @function
 * @param {IPaginator} [paginator] Pagination control
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const changePaginator = (paginator?: IPaginator) => [
    action(ArchiveTypes.CHANGE_PAGINATOR, { paginator }),
    loadRequest(paginator)
]

/**
 * Action that triggers the search for companies within the list.
 * @memberof ArchiveActions
 * @alias ArchiveActions.changeSearchPaginator
 * @function
 * @param {ISearch} search Parameters to look for.
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
 export const changeSearchPaginator = (search: ISearch) => action(ArchiveTypes.CHANGE_SEARCH_PAGINATOR, { search })

 export const changeArchiveList = (data: Archive[]) => action(ArchiveTypes.CHANGE_ARCHIVE_LIST, { data })
 
 export const changeInvalidateList = (data: ArchiveInvalidate[]) => action(ArchiveTypes.CHANGE_INVALIDATE_LIST, { data })
 
 export const changeInvalidDialog = (dialog: boolean) => action(ArchiveTypes.CHANGE_INVALID_DIALOG, { dialog })

/**
 * Action that triggers the request to obtain the list of archives.
 * @memberof ArchiveActions
 * @alias ArchiveActions.loadRequest
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadRequest = (paginator?: IPaginator) => action(ArchiveTypes.LOAD_REQUEST, { paginator })

/**
 * Action that receives the return request data from the archive list when successfully performed.
 * @memberof ArchiveActions
 * @alias ArchiveActions.loadSuccess
 * @function
 * @param {IAxiosResponse<Array<*>>} response
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadSuccess = (response: IAxiosResponse<any[]>) =>
    action(ArchiveTypes.LOAD_SUCCESS, {
        ...response
    })

/**
 * Action that interrupts the request for a list of archives due to errors in the request.
 * @memberof ArchiveActions
 * @alias ArchiveActions.loadFailure
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadFailure = () => action(ArchiveTypes.LOAD_FAILURE)