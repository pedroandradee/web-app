import { Reducer } from 'redux'
import { createReducer } from 'reduxsauce'
import { NfeItem } from '../../application/models/protocol/nfe.item'
import { failure, IActionType, IPaginator, ISearch, request, success } from '../root.types'
import { INfeState, NfeTypes } from './types'


export const INITIAL_STATE: INfeState = {
    nfe: {
        data: new NfeItem(),
        loading: false,
        success: false,
        error: false
    },
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
 * @typedef NfeTypes
 * @namespace NfeTypes
 * @category React
 * @subcategory Redux / Reducers
 */

/**
 *
 * @memberof NfeTypes
 * @alias NfeTypes.resetList
 * @param {INfeState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {INfeState}
 */
export const resetList = (state: INfeState = INITIAL_STATE) => {
    return {
        ...state,
        list: INITIAL_STATE.list
    }
}

/**
 *
 * @memberof NfeTypes
 * @alias NfeTypes.changePaginator
 * @param {INfeState} state State to be modified.
 * @param {IActionType<{ paginator: IPaginator }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {INfeState}
 */
export const changePaginator = (state: INfeState = INITIAL_STATE, action: IActionType<{ paginator: IPaginator }>) => {
    const { paginator } = action.payload
    return {
        ...state,
        list: { ...state.list, paginator }
    }
}

/**
 *
 * @memberof NfeReducers
 * @alias NfeReducers.changeSearchPaginator
 * @param {INfeState} state State to be modified.
 * @param {IActionType<{ search: ISearch }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {ICompanyState}
 */
 export const changeSearchPaginator = (state: INfeState = INITIAL_STATE, action: IActionType<{
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
 * @memberof NfeTypes
 * @alias NfeTypes.loadRequest
 * @param {INfeState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {INfeState}
 */
export const loadRequest = (state: INfeState) => {
    return { ...state, list: request(state.list) }
}

/**
 *
 * @memberof NfeTypes
 * @alias NfeTypes.loadSuccess
 * @param {INfeState} state State to be modified.
 * @param {IActionType<{ data: ProtocolItem[], headers: any }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {INfeState}
 */
export const loadSuccess = (state: INfeState = INITIAL_STATE, action: IActionType<{
    data: NfeItem[],
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
 * @memberof NfeTypes
 * @alias NfeTypes.loadFailure
 * @param {INfeState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {INfeState}
 */
export const loadFailure = (state: INfeState) => {
    return { ...state, list: failure(state.list) }
}

/**
 * Treatment combination for each action defined in {@link NfeTypes}.
 * @memberof NfeReducers
 * @param {INfeState} state Application state
 * @param action Action shot
 */
const reducer: Reducer<INfeState> = createReducer<INfeState>(INITIAL_STATE, {
    [NfeTypes.RESET_LIST]: resetList,
    [NfeTypes.CHANGE_PAGINATOR]: changePaginator,
    [NfeTypes.CHANGE_SEARCH_PAGINATOR]: changeSearchPaginator,

    [NfeTypes.LOAD_REQUEST]: loadRequest,
    [NfeTypes.LOAD_SUCCESS]: loadSuccess,
    [NfeTypes.LOAD_FAILURE]: loadFailure
})

export default reducer