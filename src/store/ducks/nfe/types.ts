import { createTypes } from 'reduxsauce'
import { NfeItem } from '../../application/models/protocol/nfe.item'
import { IComponentState, IPaginator } from '../root.types'

/**
 * <h5> </h5>
 * @typedef NfeTypes
 * @namespace NfeTypes
 * @category React
 * @subcategory Redux / Types
 */

/**
 * Typing constant of action identifiers.
 * </br>
 * The action identifiers are:
 * <pre>
 *     <ul>
 *         <li>@archive/RESET_LIST</li>
 *         <li>@archive/CHANGE_PAGINATOR</li>
 *         <li>@archive/CHANGE_SEARCH_PAGINATOR</li>
 * 
 *         <li>@archive/LOAD_REQUEST</li>
 *         <li>@archive/LOAD_SUCCESS</li>
 *         <li>@archive/LOAD_FAILURE</li>
 *      </ul>
 * </pre>
 * @memberof NfeTypes
 * @function
 * @category React
 * @subcategory Redux / Types
 * @return {DefaultActionTypes}
 */
export const NfeTypes = createTypes(`
    RESET_LIST

    CHANGE_PAGINATOR
    CHANGE_SEARCH_PAGINATOR

    LOAD_REQUEST
    LOAD_SUCCESS
    LOAD_FAILURE
    `,
    {
        prefix: '@nfes/'
    }
)

interface ICreateState extends IComponentState {
    readonly data: NfeItem
}

interface IListState extends IComponentState {
    readonly data: NfeItem[]
    readonly paginator: IPaginator
}

export interface INfeState {
    readonly nfe: ICreateState
    readonly list: IListState
}