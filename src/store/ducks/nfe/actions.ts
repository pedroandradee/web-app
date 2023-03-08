import { action } from 'typesafe-actions'
import { IAxiosResponse, IPaginator, ISearch } from '../root.types'
import { NfeTypes } from './types'

/**
 * <h5>Functions that trigger actions referring to protocols.</h5>
 * @see {@link https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions}
 * @typedef NfeActions
 * @namespace NfeActions
 * @category React
 * @subcategory Redux / Actions
 */


/**
 * Action that triggers the reset of the list of protocols.
 * @memberof NfeActions
 * @alias NfeActions.resetList
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const resetList = () => action(NfeTypes.RESET_LIST)

/**
 * Action that triggers the change of page of the list of protocols.
 * @memberof NfeActions
 * @alias NfeActions.changePaginator
 * @function
 * @param {IPaginator} [paginator] Pagination control
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const changePaginator = (protocol: string, paginator?: IPaginator) => [
    action(NfeTypes.CHANGE_PAGINATOR, { paginator }),
    loadRequest(protocol, paginator)
]

/**
 * Action that triggers the search for protocols within the list.
 * @memberof NfeActions
 * @alias NfeActions.changeSearchPaginator
 * @function
 * @param {ISearch} search Parameters to look for.
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
 export const changeSearchPaginator = (search: ISearch) => action(NfeTypes.CHANGE_SEARCH_PAGINATOR, { search })

/**
 * Action that triggers the request to obtain the list of protocols.
 * @memberof NfeActions
 * @alias NfeActions.loadRequest
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadRequest = (protocol: string, paginator?: IPaginator) => action(
    NfeTypes.LOAD_REQUEST, {
        protocol,
        paginator
    }
)

/**
 * Action that receives the return request data from the protocol list when successfully performed.
 * @memberof NfeActions
 * @alias NfeActions.loadSuccess
 * @function
 * @param {IAxiosResponse<Array<*>>} response
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadSuccess = (response: IAxiosResponse<any[]>) =>
   action(NfeTypes.LOAD_SUCCESS, {
       data: response.data,
       headers: response.headers
   })

/**
 * Action that interrupts the request for a list of protocol due to errors in the request.
 * @memberof NfeActions
 * @alias NfeActions.loadFailure
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadFailure = () => action(NfeTypes.LOAD_FAILURE)