import { createTypes } from 'reduxsauce'
import { Protocol } from '../../application/models/protocol/protocol'
import { IComponentState, IPaginator } from '../root.types'

/**
 * <h5> </h5>
 * @typedef ProtocolTypes
 * @namespace ProtocolTypes
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
 *         <li>@archive/LOAD_REQUEST</li>
 *         <li>@archive/LOAD_SUCCESS</li>
 *         <li>@archive/LOAD_FAILURE</li>
 *      </ul>
 * </pre>
 * @memberof ProtocolTypes
 * @function
 * @category React
 * @subcategory Redux / Types
 * @return {DefaultActionTypes}
 */
export const ProtocolTypes = createTypes(`
    RESET_LIST

    CHANGE_PAGINATOR
    CHANGE_SEARCH_PAGINATOR

    LOAD_REQUEST
    LOAD_SUCCESS
    LOAD_FAILURE
    `,
    {
        prefix: '@protocols/'
    }
)

interface IListState extends IComponentState {
    readonly data: Protocol[]
    readonly paginator: IPaginator
}

export interface IProtocolState {
    readonly list: IListState
}