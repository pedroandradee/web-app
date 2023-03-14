import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { IActionType } from '../root.types'
import nfeService from '../../../services/nfe'

import {
    loadSuccess,
    loadFailure
} from './actions'
import { NfeTypes } from './types'

/**
 * <h5>Generating functions that make calls to the service of nfe to obtain their data.</h5>
 * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/function*}
 * @typedef NfeSagas
 * @namespace NfeSagas
 * @category React
 * @subcategory Redux / Sagas
 */

/**
 * Generator function that makes the request to return the list of nfe items of a protocol.
 * @memberof NfeSagas
 * @alias NfeSagas.getNfeItems
 * @function
 * @category React
 * @subcategory Redux / Sagas
 * @param {IActionType} action
 */
function* getNfeItems(action: IActionType) {
    try {
        const { protocol, paginator } = action.payload
        const response = yield apply(
            nfeService,
            nfeService.getNfeItems,
            [protocol, paginator]
        )
        console.log(protocol)
        console.log(response.data)
        yield put(loadSuccess(response))
    } catch(err) {
        yield put(loadFailure())
    }
}

export default function* archiveSaga() {
    return yield all([
        takeLatest(NfeTypes.LOAD_REQUEST, getNfeItems),
    ])
}