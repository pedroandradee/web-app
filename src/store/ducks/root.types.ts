import { Action } from 'redux'

/**
 * General reducers
 */
export const request = (state: IComponentState | any) => {
    return { ...state, loading: true, success: false, error: false }
}

export const success = (state: IComponentState | any) => {
    return { ...state, success: true, loading: false, error: false }
}

export const failure = (state: IComponentState | any) => {
    return { ...state, success: false, loading: false, error: true }
}


/**
 * Component State
 */
export interface IComponentState {
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}

/**
 * Search interface
 */
export interface ISearch {
    key: string
    value: string
}

/**
 * Paginator interface
 */
export interface IPaginator {
    first: number
    rows: number
    page: number
    pageCount: number
    totalRecords: number
    search: ISearch
}

/**
 * Action type
 */
export interface IActionType<T = any> extends Action {
    payload: T
    error: boolean
    meta: any
}

/**
 * Axios response type
 */
export interface IAxiosResponse<T = any> {
    data: T
    headers: any
}
