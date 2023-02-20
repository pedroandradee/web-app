import { lazy } from 'react'

const ProtocolsList = lazy(() => import ('../containers/protocol/list'))

export const PROTOCOLS_ROUTES = [
    {
        path: '/app/protocols',
        component: ProtocolsList,
        exact: true
    }
]