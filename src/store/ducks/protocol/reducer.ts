import { Reducer } from 'redux'
import { createReducer } from 'reduxsauce'
import { Protocol } from '../../application/models/protocol/protocol'
import { failure, IActionType, IPaginator, ISearch, request, success } from '../root.types'
import { IProtocolState, ProtocolTypes } from './types'


export const INITIAL_STATE: IProtocolState = {
    list: {
        data: [],
        paginator: {
            first: 0,
            rows: 20,
            page: 0,
            pageCount: 0,
            totalRecords: 0,
            search: {
                key: '',
                value: ''
            }
        },
        loading: false,
        success: false,
        error: false
    }
}

/**
 * <h5> </h5>
 * @see {@link https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers}
 * @typedef ProtocolTypes
 * @namespace ProtocolTypes
 * @category React
 * @subcategory Redux / Reducers
 */

/**
 *
 * @memberof ProtocolTypes
 * @alias ProtocolTypes.resetList
 * @param {IProtocolState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IProtocolState}
 */
export const resetList = (state: IProtocolState = INITIAL_STATE) => {
    return {
        ...state,
        list: INITIAL_STATE.list
    }
}

/**
 *
 * @memberof ProtocolTypes
 * @alias ProtocolTypes.changePaginator
 * @param {IProtocolState} state State to be modified.
 * @param {IActionType<{ paginator: IPaginator }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IProtocolState}
 */
export const changePaginator = (state: IProtocolState = INITIAL_STATE, action: IActionType<{ paginator: IPaginator }>) => {
    const { paginator } = action.payload
    return {
        ...state,
        list: { ...state.list, paginator }
    }
}

/**
 *
 * @memberof ProtocolReducers
 * @alias ProtocolReducers.changeSearchPaginator
 * @param {IProtocolState} state State to be modified.
 * @param {IActionType<{ search: ISearch }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {ICompanyState}
 */
 export const changeSearchPaginator = (state: IProtocolState = INITIAL_STATE, action: IActionType<{
    search: ISearch
}>) => {
    const { search } = action.payload
    return {
        ...state,
        list: {
            ...state.list,
            paginator: {
                ...state.list.paginator,
                search
            }
        }
    }
}

/**
 *
 * @memberof ProtocolTypes
 * @alias ProtocolTypes.loadRequest
 * @param {IProtocolState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IProtocolState}
 */
export const loadRequest = (state: IProtocolState = INITIAL_STATE) => {
    return { ...state, list: request(state.list) }
}

/**
 *
 * @memberof ProtocolTypes
 * @alias ProtocolTypes.loadSuccess
 * @param {IProtocolState} state State to be modified.
 * @param {IActionType<{ data: Protocol[], headers: any }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IProtocolState}
 */
export const loadSuccess = (state: IProtocolState = INITIAL_STATE, action: IActionType<{
    data: Protocol[],
    headers: any
}>) => {
    const { data, headers } = action.payload
    const paginator = {
        ...state.list.paginator,
        totalRecords: parseInt(headers['x-total-count'], 10)
    }
    return { ...state, list: success({ ...state.list, data, paginator })}
}

/**
 *
 * @memberof ProtocolTypes
 * @alias ProtocolTypes.loadFailure
 * @param {IProtocolState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IProtocolState}
 */
export const loadFailure = (state: IProtocolState) => {
    return { ...state, list: failure(state.list) }
}

/**
 * Treatment combination for each action defined in {@link ProtocolTypes}.
 * @memberof ProtocolReducers
 * @param {IProtocolState} state Application state
 * @param action Action shot
 */
const reducer: Reducer<IProtocolState> = createReducer<IProtocolState>(INITIAL_STATE, {
    [ProtocolTypes.RESET_LIST]: resetList,
    [ProtocolTypes.CHANGE_PAGINATOR]: changePaginator,
    [ProtocolTypes.CHANGE_SEARCH_PAGINATOR]: changeSearchPaginator,

    [ProtocolTypes.LOAD_REQUEST]: loadRequest,
    [ProtocolTypes.LOAD_SUCCESS]: loadSuccess,
    [ProtocolTypes.LOAD_FAILURE]: loadFailure
})

export default reducer