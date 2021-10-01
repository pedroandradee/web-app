import { lazy } from 'react'

const Login = lazy(() => import('../containers/auth/login'))
const Forgot = lazy(() => import('../containers/auth/forgot'))
const ChangePassword = lazy(() => import('../containers/auth/change.password'))

export const AUTH_ROUTES = [
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/forgot',
        component: Forgot,
        exact: true
    },
    {
        path: '/:language/password-reset',
        component: ChangePassword,
        exact: true
    }
]
