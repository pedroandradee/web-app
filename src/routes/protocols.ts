import { lazy } from 'react'

const ProtocolsList = lazy(() => import ('../containers/protocol/list'))
const GeneralConsutation = lazy(() => import ('../containers/protocol/data'))

export const PROTOCOLS_ROUTES = [
    {
        path: '/app/protocols',
        component: ProtocolsList,
        exact: true
    },
    {
        path: `/app/protocols/:protocol_id`,
        component: GeneralConsutation,
        exact: true
    }
]