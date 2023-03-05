import { createTypes } from 'reduxsauce'
import { Protocol } from '../../application/models/protocol/protocol'
import { ProtocolItem } from '../../application/models/protocol/protocol.item'
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

    FIND_REQUEST
    FIND_SUCCESS
    FIND_FAILURE

    LOAD_PROTOCOL_ITEMS_REQUEST
    LOAD_PROTOCOL_ITEMS_SUCCESS
    LOAD_PROTOCOL_ITEMS_FAILURE
    `,
    {
        prefix: '@protocols/'
    }
)

interface ICreateState extends IComponentState {
    readonly data: Protocol
}

interface IListState extends IComponentState {
    readonly data: Protocol[]
    readonly paginator: IPaginator
}

interface IProtocolItemsListState extends IComponentState {
    readonly data: ProtocolItem[]
    readonly paginator: IPaginator
}

export interface IProtocolState {
    readonly protocol: ICreateState
    readonly list: IListState
    readonly protocolItemsList: IProtocolItemsListState
}