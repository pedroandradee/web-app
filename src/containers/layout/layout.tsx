import React, { Component, lazy, Suspense } from 'react'

import { WithTranslation, withTranslation } from 'react-i18next'
import { 
    Box,
    Container, 
    createStyles, 
    isWidthDown, 
    Theme, 
    WithStyles, 
    withStyles, 
    WithWidth, 
    withWidth 
} from '@material-ui/core'
import { RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import * as LayoutActions from '../../store/ducks/layout/actions'
import { IApplicationState } from '../../store'
import { UnregisterCallback } from 'history'
import { RouteWithSubRoutes } from '../../routes'
import localStorageService from '../../services/local.storage'
import { ThemeMode } from '../../material.theme'
import { DRAWER_WIDTH } from '../../components/layout/nav.bar'

const Footer = lazy(() => import('../../components/layout/footer'))
const BreadcrumbsComponent = lazy(() => import('../../components/layout/breadcrumb'))
const Loading = lazy(() => import('../../components/layout/loading'))
const AppBar = lazy(() => import('../../components/layout/app.bar'))
const NavBar = lazy(() => import('../../components/layout/nav.bar'))

const Style = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default
    },
    content: {
        position: 'relative',
        maxWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100%',
        padding: theme.spacing(2),
        paddingBottom: 0,
        margin: '0 auto',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1)
        }
    },
    contentInside: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 auto',
        padding: 0,
        margin: 0,
        maxWidth: 'none',
        width: '100%'
    },
    contentCenter: {
        margin: '0 auto'
    }
})

interface Props extends WithStyles<typeof Style, true> {
    readonly routes: []
    readonly avatar: string
    readonly username: string
    readonly appBarBgColor: string
    readonly appBarIconColor: string
    readonly themeMode: ThemeMode

    readonly breadCrumbLast: string


    changeAppBarColors(backgroundColor: string, iconColor: string): void

    changeUsername(username: string): void

    changeAvatar(avatar): void
}

type IProps = Props & WithTranslation & RouteComponentProps & WithWidth

interface IState {
    readonly mobileOpen: boolean
    readonly desktopOpen: boolean
}

export const MIN_DESKTOP_WIDTH = 1280



class Layout extends Component<IProps, IState> {

    private removeListener: UnregisterCallback

    constructor(props: IProps) {
        super(props)
        /* Bind Context */
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
        this.verifyActiveRoute = this.verifyActiveRoute.bind(this)
        this.verifyDataInLocalStorage = this.verifyDataInLocalStorage.bind(this)
        this.handleDrawerToggleDesktop = this.handleDrawerToggleDesktop.bind(this)

        /* Initial State  */
        this.state = {
            mobileOpen: false,
            desktopOpen: window.screen.width > MIN_DESKTOP_WIDTH
        }
        this.removeListener = this.registerListener()
    }

    public componentDidMount() {
        const { location: { pathname } } = this.props
        this.verifyActiveRoute(pathname)
        this.verifyDataInLocalStorage()
    }

    public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        const { themeMode, location: { pathname } } = this.props
        const { themeMode: prevThemeMode } = prevProps
        if (themeMode !== prevThemeMode) {
            this.verifyActiveRoute(pathname)
        }
    }

    public componentWillUnmount(): void {
        this.removeListener()
    }

    public render() {
        const {
            t,
            classes,
            theme,
            routes,
            username,
            avatar,
            breadCrumbLast,
            themeMode,
            width
        } = this.props
        const {
            mobileOpen,
            desktopOpen
        } = this.state

        const downMd = isWidthDown('md', width)

        return <Box component="div" className={classes.root}>

            <AppBar
                theme={theme}
                avatar={avatar}
                desktopOpen={desktopOpen}
                username={username}
                drawerToggleDesktop={this.handleDrawerToggleDesktop}
                drawerToggle={this.handleDrawerToggle}/>

            <NavBar
                mobileOpen={mobileOpen}
                desktopOpen={desktopOpen}
                drawerToggle={this.handleDrawerToggle}
                theme={theme}
                themeMode={themeMode}
                closeMobileView={() => this.setState({ mobileOpen: false })}/>

            <Container 
                className={classes.content}
                style={{ width: desktopOpen && !downMd ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%'}}>

                <Container className={classes.contentInside}>

                    <BreadcrumbsComponent breadCrumbLast={breadCrumbLast}/>

                    <Suspense fallback={<Loading message={t('DEFAULT.LOADING')}/>}>
                        {
                            !!routes?.length && <Switch>
                                {
                                    routes
                                        .map((route: any, i: number) => (
                                            <RouteWithSubRoutes key={i} {...route}/>
                                        ))
                                }
                            </Switch>

                        }
                    </Suspense>

                </Container>

                <Footer/>

            </Container>

        </Box>
    }

    private handleDrawerToggle() {
        const { mobileOpen } = this.state
        this.setState({ mobileOpen: !mobileOpen })
    }

    private registerListener(): UnregisterCallback {
        const { history } = this.props
        return history.listen((location) => {
            const { pathname } = location
            this.verifyActiveRoute(pathname)
        })
    }

    private verifyActiveRoute(pathname): void {
        const { theme } = this.props
        const { changeAppBarColors } = this.props
        if (/physical_activities/gi.test(pathname)) {
            changeAppBarColors(theme.palette.secondary.main, '#FFFFFF')
        } else if (
            ['step', 'calories', 'distance', 'active_minutes']
                .some((resource: string) => RegExp(resource, 'gi').test(pathname))
        ) {
            changeAppBarColors(theme.palette.primary.main, '#FFFFFF')
        } else {
            changeAppBarColors(theme.palette.background.paper, theme.palette.text.primary)
        }
    }

    /**
     * Function that changes drawer visibility on desktop screens
     * @returns {*}
     */
     private handleDrawerToggleDesktop(): void {
        const { desktopOpen } = this.state
        this.setState({ desktopOpen: !desktopOpen })
    }

    private verifyDataInLocalStorage(): void {
        const {
            username,
            avatar,
            changeAvatar,
            changeUsername
        } = this.props

        const localUsername = localStorageService.getItem('username')
        const localAvatar = localStorageService.getItem('avatar')

        if (localUsername && !username) {
            changeUsername(localUsername)
        }
        if (localAvatar && !avatar) {
            changeAvatar(localAvatar)
        }
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    avatar: state.layout.appBar.avatar,
    username: state.layout.appBar.username,
    breadCrumbLast: state.layout.breadCrumbLast,
    themeMode: state.layout.themeMode
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(LayoutActions, dispatch)

const LayoutWithTranslation = withTranslation()(Layout)

const LayoutWithWidth = withWidth()(LayoutWithTranslation)

const LayoutWithStyle = withStyles<any>(Style, { withTheme: true })(LayoutWithWidth)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutWithStyle))
