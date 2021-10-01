import { action } from 'typesafe-actions'
import { SnackBarTypes } from './types'
import { SnackBarMessageType } from '../../../components/snackbar'

export const open = (type: SnackBarMessageType, title: string, message: string) => action(
    SnackBarTypes.OPEN,
    { type, title, message }
)

export const close = () => action(SnackBarTypes.CLOSE, {})
