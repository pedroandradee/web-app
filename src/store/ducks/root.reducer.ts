import { combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import auth from './auth/reducer'
import layout from './layout/reducer'
import snackBar from './snack.bar/reducer'

const createRootReducer = (history: History) => combineReducers({
    auth,
    layout,
    router: connectRouter(history),
    snackBar
})

export default createRootReducer
