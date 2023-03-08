import { combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import auth from './auth/reducer'
import layout from './layout/reducer'
import snackBar from './snack.bar/reducer'
import archive from './archive/reducer'
import protocol from './protocol/reducer'
import nfe from './nfe/reducer'

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    auth,
    layout,
    snackBar,
    archive,
    protocol,
    nfe
})

export default createRootReducer
