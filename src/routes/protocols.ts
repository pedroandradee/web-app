import { lazy } from 'react'

const ProtocolsList = lazy(() => import ('../containers/protocol/list'))
const ArchivesList = lazy(() => import ('../containers/archive/list'))

export const PROTOCOLS_ROUTES = [
    {
        path: '/app/protocols',
        component: ProtocolsList,
        exact: true
    },
    {
        path: '/app/protocols/1111',
        component:ArchivesList,
        exact: true
    }
]