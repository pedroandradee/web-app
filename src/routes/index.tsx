import React, { lazy, Suspense } from 'react'

import { Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import authService from '../services/auth'
import { ScopesUtil } from '../store/application/utils/scopes.util'
import { AUTH_ROUTES } from './auth'
import Loading from '../components/layout/loading'
import { VerifyUserType } from '../components/verify.user.type'
import { PROTOCOLS_ROUTES } from './protocols'


export enum LogicalStrategy {
    OR = 'or',
    AND = 'and'
}

interface IPrivateRouteProps extends RouteProps {
    key?: number
    component?: any
    private?: boolean
    redirect?: string
    path?: string
    routes?: any
    properties?: any[]
    scopes?: string[]
    userTypes?: string[]
    logicalStrategy?: LogicalStrategy
}

export const RouteWithSubRoutes = (route: IPrivateRouteProps) => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props: RouteProps) => {
                /* Verify user is authenticated */
                if (route.private && !authService.isAuthenticated()) {
                    return (
                        <Redirect
                            to={{ pathname: '/login', state: { from: props.location } }}
                        />
                    )
                }
                /* Make sure the user has the necessary scopes */
                if (route.scopes) {
                    try {
                        if (!ScopesUtil.verifyScopes(route.scopes, route.logicalStrategy)) {
                            throw new Error('ACCESS DENIED')
                        }
                    } catch (e) {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/access_denied',
                                    state: { from: props.location }
                                }}
                            />
                        )
                    }
                }
                /* Make sure the user has the necessary type */
                if (route?.userTypes) {
                    try {
                        if (!VerifyUserType.validate(route?.userTypes)) {
                            throw new Error('ACCESS DENIED')
                        }
                    } catch (e) {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/access_denied',
                                    state: { from: props.location }
                                }}
                            />
                        )
                    }
                }
                /* Checks for a redirect link */
                if (route.redirect) {
                    return (
                        <Redirect
                            to={{
                                pathname: `${route.redirect}`,
                                state: { from: props.location }
                            }}
                        />
                    )
                }
                return (
                    <route.component
                        {...props}
                        {...route.properties}
                        exact={true}
                        routes={route.routes}
                    />
                )
            }}
        />
    )
}

const Layout = lazy(() => import('../containers/layout/layout'))
const HomePage = lazy(() => import('../containers/home/home'))
const NotFound = lazy(() => import('../components/layout/escape.pages/not.found'))
const AccessDenied = lazy(() => import('../components/layout/escape.pages/access.denied'))
const InternalError = lazy(() => import('../components/layout/escape.pages/internal.error'))
// const Protocols = lazy(()=> import('../components/protocols/protocols.table'))

const ROUTES: IPrivateRouteProps | any = [
    { path: '/', exact: true, redirect: '/app/home' },
    ...AUTH_ROUTES,
    {
        path: '/app',
        strict: true,
        private: false,
        component: Layout,
        routes: [
            { path: '/app', exact: true, redirect: '/app/home' },
            {
                path: '/app/home',
                exact: true,
                component: HomePage
            },
            ...PROTOCOLS_ROUTES,
            /*{
                path: '/app/archives',
                component: Protocols,
                exact: true
            },*/
            { path: '*', redirect: '/not_found' }
        ]
    },
    {
        path: '/not_found',
        component: NotFound,
        exact: true
    },
    {
        path: '/access_denied',
        component: AccessDenied,
        exact: true
    },
    {
        path: '/internal_error',
        component: InternalError,
        exact: true
    },
    {
        path: '*',
        component: NotFound
    }
   
]

class Routes extends React.Component<{ history: any }> {
    public render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        {
                            ROUTES
                                .map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))
                        }
                    </Switch>
                </Suspense>
            </ConnectedRouter>
        )
    }
}

export default Routes
