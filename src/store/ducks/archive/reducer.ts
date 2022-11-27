import { Reducer } from 'redux'
import { createReducer } from 'reduxsauce'
import { Archive } from '../../application/models/archive/archive'
import { failure, IActionType, IPaginator, ISearch, request, success } from '../root.types'
import { ArchiveTypes, IArchiveState } from './types'


export const INITIAL_STATE: IArchiveState = {
    create: {
        archive: new Archive(),
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
 * @typedef ArchiveTypes
 * @namespace ArchiveTypes
 * @category React
 * @subcategory Redux / Reducers
 */

/**
 *
 * @memberof ArchiveTypes
 * @alias ArchiveTypes.resetList
 * @param {IArchiveState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IArchiveState}
 */
export const resetList = (state: IArchiveState = INITIAL_STATE) => {
    return {
        ...state,
        list: INITIAL_STATE.list
    }
}

/**
 *
 * @memberof ArchiveTypes
 * @alias ArchiveTypes.changePaginator
 * @param {IArchiveState} state State to be modified.
 * @param {IActionType<{ paginator: IPaginator }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IArchiveState}
 */
export const changePaginator = (state: IArchiveState = INITIAL_STATE, action: IActionType<{ paginator: IPaginator }>) => {
    const { paginator } = action.payload
    return {
        ...state,
        list: { ...state.list, paginator }
    }
}

/**
 *
 * @memberof ArchiveReducers
 * @alias ArchiveReducers.changeSearchPaginator
 * @param {IArchiveState} state State to be modified.
 * @param {IActionType<{ search: ISearch }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {ICompanyState}
 */
 export const changeSearchPaginator = (state: IArchiveState = INITIAL_STATE, action: IActionType<{
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
 * @memberof ArchiveTypes
 * @alias ArchiveTypes.loadRequest
 * @param {IArchiveState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IArchiveState}
 */
export const loadRequest = (state: IArchiveState = INITIAL_STATE) => {
    return { ...state, list: request(state.list) }
}

/**
 *
 * @memberof ArchiveTypes
 * @alias ArchiveTypes.loadSuccess
 * @param {IArchiveState} state State to be modified.
 * @param {IActionType<{ data: Archive[], headers: any }>} action
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IArchiveState}
 */
export const loadSuccess = (state: IArchiveState = INITIAL_STATE, action: IActionType<{
    data: Archive[],
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
 * @memberof ArchiveTypes
 * @alias ArchiveTypes.loadFailure
 * @param {IArchiveState} state State to be modified.
 * @function
 * @category React
 * @subcategory Redux / Reducers
 * @return {IArchiveState}
 */
export const loadFailure = (state: IArchiveState) => {
    return { ...state, list: failure(state.list) }
}

/**
 * Treatment combination for each action defined in {@link ArchiveTypes}.
 * @memberof ArchiveReducers
 * @param {IArchiveState} state Application state
 * @param action Action shot
 */
const reducer: Reducer<IArchiveState> = createReducer<IArchiveState>(INITIAL_STATE, {
    [ArchiveTypes.RESET_LIST]: resetList,
    [ArchiveTypes.CHANGE_PAGINATOR]: changePaginator,
    [ArchiveTypes.CHANGE_SEARCH_PAGINATOR]: changeSearchPaginator,

    [ArchiveTypes.LOAD_REQUEST]: loadRequest,
    [ArchiveTypes.LOAD_SUCCESS]: loadSuccess,
    [ArchiveTypes.LOAD_FAILURE]: loadFailure
})

export default reducer