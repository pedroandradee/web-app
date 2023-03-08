import { applyMiddleware, createStore, Store } from 'redux'

import createSagaMiddleware from 'redux-saga'
import multi from 'redux-multi'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './ducks/root.reducer'
import rootSaga from './ducks/root.saga'
import { IAuthState } from './ducks/auth/types'
import { ILayoutState } from './ducks/layout/types'
import { ISnackBarState } from './ducks/snack.bar/types'
import { IArchiveState } from './ducks/archive/types'
import { IProtocolState } from './ducks/protocol/types'
import { INfeState } from './ducks/nfe/types'

export interface IApplicationState {
    auth: IAuthState,
    layout: ILayoutState,
    snackBar: ISnackBarState,
    archive: IArchiveState,
    protocol: IProtocolState,
    nfe: INfeState
}

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const store: Store<IApplicationState> = createStore(
    rootReducer(history),
    /* composeWithDevTools is integration for plugin redux/devtools chrome.
    * see https://github.com/zalmoxisus/redux-devtools-extension
    * */
    composeWithDevTools(
        applyMiddleware(multi, sagaMiddleware, routerMiddleware(history))
    )
)

sagaMiddleware.run(rootSaga)

export default store
