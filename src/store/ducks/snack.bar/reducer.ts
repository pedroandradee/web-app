import { Reducer } from 'redux'
import { ISnackBarState, SnackBarTypes } from './types'
import { SnackBarMessageType } from '../../../components/layout/snackbar'


const INITIAL_STATE: ISnackBarState = {
    open: false,
    title: '',
    message: '',
    type: SnackBarMessageType.INFO
}

const reducer: Reducer<ISnackBarState> = (state: ISnackBarState = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case SnackBarTypes.OPEN:
            const { message, type, title } = action.payload
            return { open: true, message, type, title }

        case SnackBarTypes.CLOSE:
            return { ...state, open: false }

        default:
            return state
    }
}

export default reducer
