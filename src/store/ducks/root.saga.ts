import { all, fork } from 'redux-saga/effects'

import authSaga from './auth/sagas'
import archiveSaga from './archive/saga'

export default function* rootSaga() {
    return yield all([
        fork(authSaga),
        fork(archiveSaga),
    ])
}
