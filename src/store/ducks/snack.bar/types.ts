/**
 * Action types
 */

import { SnackBarMessageType } from '../../../components/layout/snackbar'
import { createTypes } from 'reduxsauce'

export const SnackBarTypes = createTypes(`
    OPEN
    CLOSE
`,
    {
        prefix: '@snack.bar/'
    }
)

/**
 * State type
 */
export interface ISnackBarState {
    readonly open: boolean
    readonly message: string
    readonly title: string
    readonly type: SnackBarMessageType
}
