import { createTypes } from 'reduxsauce'
import { Archive } from '../../application/models/archive/archive'
import { IComponentState, IPaginator } from '../root.types'

/**
 * <h5> </h5>
 * @typedef ArchiveTypes
 * @namespace ArchiveTypes
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
 * @memberof ArchiveTypes
 * @function
 * @category React
 * @subcategory Redux / Types
 * @return {DefaultActionTypes}
 */
export const ArchiveTypes = createTypes(`
    RESET_LIST

    CHANGE_PAGINATOR
    CHANGE_SEARCH_PAGINATOR

    LOAD_REQUEST
    LOAD_SUCCESS
    LOAD_FAILURE
    `,
    {
        prefix: '@archives/'
    }
)

export interface ILoadArchives {
    readonly test: string
}

/**
 * @memberof ArchiveTypes
 * @interface
 * @category React
 * @subcategory Redux / Types
 * @property {Archive} archive
 */
export interface ICreateState extends IComponentState {
    readonly archive: Archive
}

/**
 * @memberof ArchiveTypes
 * @interface
 * @category React
 * @subcategory Redux / Types
 * @property {Array<Archive>} archives
 * @property {IPaginator} paginator
 */
export interface ILoadState extends IComponentState {
    readonly data: Archive[]
    readonly paginator: IPaginator
}

/**
 * @memberof ArchiveTypes
 * @interface
 * @category React
 * @subcategory Redux / Types
 * @property {ICreateState} archive
 * @property {ILoadState} list
 */
export interface IArchiveState {
    readonly create: ICreateState
    readonly list: ILoadState
}