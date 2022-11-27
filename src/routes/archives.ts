import { lazy } from 'react'

const ArchivesList = lazy(() => import('../containers/archive/list'))

export const ARCHIVES_ROUTES = [
    {
        path: '/app/archives',
        component: ArchivesList,
        exact: true
    }
]