import React, { Component, lazy } from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    CircularProgress,
    createStyles,
    Hidden,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core'
import {
    AccountCircle as AccountCircleIcon,
    ExitToApp as ExitToAppIcon,
    Face as FaceIcon,
    Menu as MenuIcon
} from '@material-ui/icons'

import authService from '../../../services/auth'
import { MIN_DESKTOP_WIDTH } from '../../../containers/layout/layout'

const ThemeButton = lazy(() => import('../../../containers/layout/theme.button'))

const DRAWER_WIDTH = 250

export const UserButton = withStyles(() => ({
    root: { textTransform: 'none' }
}))(Button)

const Style = (theme: Theme) => createStyles({
    appBar: {
        transition: '.2s all'
    },
    drawerOpen: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH
        },
        transition: '.3s all'
    },
    menuButton: {
        color: 'inherit'
    },
    title: {
        flexGrow: 1
    }
})

interface Props extends WithStyles<typeof Style, true> {
    readonly avatar: string
    readonly username: string
    readonly desktopOpen: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {
    drawerToggle(): void

    drawerToggleDesktop(): void
}

interface IState {
    readonly anchorEl: Element | undefined
    readonly goingOut: boolean
}

type IProps = Props & WithTranslation & IDispatchProps

class AppBarComponent extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        /* Bind Context */
        this.handleClick = this.handleClick.bind(this)
        this.logout = this.logout.bind(this)
        this.profile = this.profile.bind(this)
        /* Initial State */
        this.state = {
            anchorEl: undefined,
            goingOut: false
        }
    }

    public render() {
        const {
            classes,
            drawerToggle,
            drawerToggleDesktop,
            t,
            username,
            avatar,
            desktopOpen,
            theme
        } = this.props

        const {
            anchorEl,
            goingOut
        } = this.state

        return <AppBar
            className={
                desktopOpen ?
                classes.drawerOpen :
                classes.appBar
            }
            style={{ 
                background: theme.palette.primary.main, 
                color: theme.palette.background.paper 
            }}>

            <Toolbar variant="dense">
                {
                    window.screen.width <= MIN_DESKTOP_WIDTH ?
                    <Hidden mdUp={true} implementation="css">
                        <IconButton
                            id="btn_toggle_drawer"
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={drawerToggle}
                            className={classes.menuButton}
                            style={{ color: 'white' }}>
                            <MenuIcon/>
                        </IconButton>
                    </Hidden> :
                    <Box>
                        <Hidden lgUp={true} implementation="css">
                                <IconButton
                                    id="btn_toggle_drawer"
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={drawerToggle}
                                    className={classes.menuButton}
                                    style={{ color: 'white' }}>
                                    <MenuIcon/>
                                </IconButton>
                            </Hidden>

                            <Hidden mdDown={true} implementation="css">
                                <IconButton
                                    id="btn_toggle_drawer"
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={drawerToggleDesktop}
                                    className={classes.menuButton}
                                    style={{ color: 'white' }}>
                                    <MenuIcon/>
                                </IconButton>
                            </Hidden>
                    </Box>
                }


                <Typography variant="h6" className={classes.title} noWrap={true}/>

                <ThemeButton color={theme.palette.background.paper}/>

                <Box display="flex" justifyContent="center" alignItems="center">
                    {
                        goingOut && (
                            <Box position="absolute" zIndex={1100}>
                                <CircularProgress size={24} color="primary"/>
                            </Box>
                        )
                    }
                    <UserButton
                        id="btn_user_logged"
                        color="inherit"
                        onClick={this.handleClick}
                        endIcon={
                            avatar ? <Avatar
                                    src={avatar}
                                    style={{ width: '20px', height: '20px' }}
                                    alt={`${t('DEFAULT.AVATAR')}`}/>
                                :
                                <AccountCircleIcon color="disabled" style={{ color: theme.palette.background.paper }}/>
                        }>
                        {username || '...'}
                    </UserButton>
                </Box>

                <Menu
                    id="menu_user_logged"
                    anchorEl={anchorEl}
                    keepMounted={true}
                    open={Boolean(anchorEl)}
                    onClose={() => this.handleClick(null)}>
                    <MenuItem
                        id="menu_item_profile"
                        onClick={() => {
                            this.handleClick(null)
                            this.profile()
                        }}>
                        <ListItemIcon>
                            <FaceIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit" noWrap={true}>
                            {t('APP_BAR.PROFILE')}
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        id="menu_item_logout"
                        onClick={() => {
                            this.handleClick(null)
                            this.logout()
                        }}>
                        <ListItemIcon>
                            <ExitToAppIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit" noWrap={true}>
                            {t('APP_BAR.EXIT')}
                        </Typography>
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    }

    private handleClick(event) {
        this.setState({ anchorEl: event?.currentTarget })
    }

    private async logout(): Promise<void> {
        this.setState({ goingOut: true })
        authService.logout()
        window.location.reload()
    }

    private profile(): void {
        this.props.history.push(`/app/myprofile`)
    }

}

const AppBarTranslation = withTranslation()(AppBarComponent)

const AppBarWithStyle = withStyles<any>(Style, { withTheme: true })(AppBarTranslation)

export default withRouter(AppBarWithStyle)
