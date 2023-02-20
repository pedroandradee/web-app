import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { IActionType } from '../root.types'
import { 
    loadSuccess, 
    loadFailure 
} from './actions'
import { ProtocolTypes } from './types'
import protocolService from '../../../services/protocol'


/**
 * <h5>Generating functions that make calls to the service of protocols to obtain their data.</h5>
 * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/function*}
 * @typedef ProtocolSagas
 * @namespace ProtocolSagas
 * @category React
 * @subcategory Redux / Sagas
 */

/**
 * Generator function that makes the request to return the list of protocols.
 * @memberof ProtocolSagas
 * @alias ProtocolSagas.getCompanies
 * @function
 * @category React
 * @subcategory Redux / Sagas
 * @param {IActionType} action
 */
function* getProtocols(action: IActionType) {
    try {
        const { paginator } = action.payload
        const response = yield apply(
            protocolService,
            protocolService.getProtocols,
            [paginator]
        )
        yield put(loadSuccess(response))
    } catch(err) {
        yield put(loadFailure())
    }
}

export default function* archiveSaga() {
    return yield all([
        takeLatest(ProtocolTypes.LOAD_REQUEST, getProtocols),
    ])
}