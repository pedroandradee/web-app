import { action } from 'typesafe-actions'
import { Protocol } from '../../application/models/protocol/protocol'
import { changeBreadCrumbLast } from '../layout/actions'
import { IAxiosResponse, IPaginator, ISearch } from '../root.types'
import { ProtocolTypes } from './types'

/**
 * <h5>Functions that trigger actions referring to protocols.</h5>
 * @see {@link https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions}
 * @typedef ProtocolActions
 * @namespace ProtocolActions
 * @category React
 * @subcategory Redux / Actions
 */

/**
 * Action that triggers the reset of the list of protocols.
 * @memberof ProtocolActions
 * @alias ProtocolActions.resetList
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const resetList = () => action(ProtocolTypes.RESET_LIST)

/**
 * Action that triggers the change of page of the list of protocols.
 * @memberof ProtocolActions
 * @alias ProtocolActions.changePaginator
 * @function
 * @param {IPaginator} [paginator] Pagination control
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const changePaginator = (paginator?: IPaginator) => [
    action(ProtocolTypes.CHANGE_PAGINATOR, { paginator }),
    loadRequest(paginator)
]

/**
 * Action that triggers the search for protocols within the list.
 * @memberof ProtocolActions
 * @alias ProtocolActions.changeSearchPaginator
 * @function
 * @param {ISearch} search Parameters to look for.
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
 export const changeSearchPaginator = (search: ISearch) => action(ProtocolTypes.CHANGE_SEARCH_PAGINATOR, { search })

/**
 * Action that triggers the request to obtain the list of protocols.
 * @memberof ProtocolActions
 * @alias ProtocolActions.loadRequest
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadRequest = (paginator?: IPaginator) => action(ProtocolTypes.LOAD_REQUEST, { paginator })

/**
 * Action that receives the return request data from the protocol list when successfully performed.
 * @memberof ProtocolActions
 * @alias ProtocolActions.loadSuccess
 * @function
 * @param {IAxiosResponse<Array<*>>} response
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadSuccess = (response: IAxiosResponse<any[]>) =>
    action(ProtocolTypes.LOAD_SUCCESS, {
        ...response
    })

/**
 * Action that interrupts the request for a list of protocol due to errors in the request.
 * @memberof ProtocolActions
 * @alias ProtocolActions.loadFailure
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const loadFailure = () => action(ProtocolTypes.LOAD_FAILURE)

/**
 * Action that triggers the request to obtain the list of protocols.
 * @memberof ProtocolActions
 * @alias ProtocolActions.findRequest
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const findRequest = (protocol: string) => action(ProtocolTypes.FIND_REQUEST, { protocol })

/**
 * Action that receives the return request data from the protocol list when successfully performed.
 * @memberof ProtocolActions
 * @alias ProtocolActions.findSuccess
 * @function
 * @param {IAxiosResponse<Protocol>} response
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const findSuccess = (protocol: Protocol) => [
    action(ProtocolTypes.FIND_SUCCESS, { protocol }),
    changeBreadCrumbLast(`${protocol?.name}(${protocol?.protocol})`)
]

/**
 * Action that interrupts the request for a list of protocol due to errors in the request.
 * @memberof ProtocolActions
 * @alias ProtocolActions.findFailure
 * @function
 * @category React
 * @subcategory Redux / Actions
 * @return Redux.Action
 */
export const findFailure = () => action(ProtocolTypes.FIND_FAILURE)