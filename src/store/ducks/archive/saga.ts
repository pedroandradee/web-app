import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { IActionType } from '../root.types'
import { 
    loadSuccess, 
    loadFailure 
} from './actions'
import { ArchiveTypes } from './types'
import archiveService from '../../../services/archive'


/**
 * <h5>Generating functions that make calls to the service of companies to obtain their data.</h5>
 * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/function*}
 * @typedef CompanySagas
 * @namespace CompanySagas
 * @category React
 * @subcategory Redux / Sagas
 */

/**
 * Generator function that makes the request to return the list of companies.
 * @memberof CompanySagas
 * @alias CompanySagas.getCompanies
 * @function
 * @category React
 * @subcategory Redux / Sagas
 * @param {IActionType} action
 */
function* getArchives(action: IActionType) {
    try {
        const { paginator } = action.payload
        const response = yield apply(
            archiveService,
            archiveService.getArchives,
            [paginator]
        )
        yield put(loadSuccess(response))
    } catch(err) {
        yield put(loadFailure())
    }
}

export default function* archiveSaga() {
    return yield all([
        takeLatest(ArchiveTypes.LOAD_REQUEST, getArchives),
    ])
}