import React, { Component } from 'react'

import { Link, NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next'
import {
    Box,
    createStyles,
    Drawer,
    Grid,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SvgIcon,
    Theme,
    Tooltip,
    WithStyles,
    withStyles
} from '@material-ui/core'
import { Home } from '@material-ui/icons'
import clsx from 'clsx'
import { ThemeMode } from '../../material.theme'
import { ReactComponent as LogoLight } from '../../assets/imgs/logo_light.svg'
import { ReactComponent as LogoDark } from '../../assets/imgs/logo_dark.svg'

interface Props extends WithStyles<typeof NavBarStyle, true> {
    readonly mobileOpen: boolean
    readonly themeMode: ThemeMode

    drawerToggle(): void

    closeMobileView(): void
}

type IProps = Props & WithTranslation & RouteComponentProps

const drawerWidth = 250

const NavBarStyle = (theme: Theme) => createStyles({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0
        },
        border: 'none'
    },
    drawerLogo: {
        textAlign: 'center',
        padding: theme.spacing(2)
    },
    drawerPaper: {
        width: drawerWidth,
        boxShadow: '2px 50px 10px 0px rgba(0,0,0,0.3)',
        border: 'none'
    },
    toolbar: theme.mixins.toolbar,
    nested: {
        paddingLeft: theme.spacing(2.5)
    },
    primaryIcon: {
        fontSize: 30
    },
    secondaryIcon: {
        fontSize: 14,
        marginLeft: -10
    },
    collapsedActive: {
        border: '1px dashed'
    },
    navActive: {
        color: `#FFFFFF !important`,
        '& svg': {
            color: `#FFFFFF !important`
        }
    },
    primaryColor: {
        backgroundColor: `${theme.palette.primary.main} !important`
    },
    primaryBorderColor: {
        borderColor: `${theme.palette.primary.main}`
    },
    secondaryColor: {
        backgroundColor: `${theme.palette.secondary.main} !important`
    },
    secondaryBorderColor: {
        borderColor: `${theme.palette.secondary.main}`
    },
    logo: {
        width: 180,
        height: 68
    }
})

interface State {
    readonly usersCollapse: boolean
    readonly collapsePatients: boolean
}

class NavBar extends Component<IProps, State> {

    constructor(props: IProps) {
        super(props)
        /* Bind Context */
        this.collapseUsers = this.collapseUsers.bind(this)
        this.collapsePatients = this.collapsePatients.bind(this)
        this.verifyUsersActiveRoute = this.verifyUsersActiveRoute.bind(this)
        this.verifyPatientActiveRoute = this.verifyPatientActiveRoute.bind(this)
        this.colorStyle = this.colorStyle.bind(this)
        /* Initial Style */
        this.state = {
            usersCollapse: false,
            collapsePatients: false
        }
    }

    public render() {
        const {
            t,
            classes,
            drawerToggle,
            mobileOpen,
            theme,
            closeMobileView,
            themeMode
        } = this.props

        const container = window !== undefined ? () => window.document.body : undefined

        const { colorStyle } = this.colorStyle()

        const drawer = (
            <React.Fragment>
                <div className={classes.toolbar}>
                    <Grid container={true} justifyContent="center">
                        <Tooltip title={`${t('DRAWER.HOME')}`} arrow={true}>
                            <Box className={classes.drawerLogo}>
                                <Link id="link_to_home_page" to="/" onClick={closeMobileView}>
                                    <SvgIcon
                                        component={themeMode === ThemeMode.LIGHT ? LogoLight : LogoDark}
                                        viewBox="0 0 164 62"
                                        className={classes.logo}/>
                                </Link>
                            </Box>
                        </Tooltip>
                    </Grid>
                </div>
                <List id="list_nav_bar_menu">

                    <ListItem
                        id="list_item_home"
                        button={true}
                        component={NavLink}
                        to="/app/home"
                        onClick={closeMobileView}
                        activeClassName={clsx(classes.navActive, colorStyle)}>
                        <ListItemIcon><Home/></ListItemIcon>
                        <ListItemText primary={t('DRAWER.HOME')}/>
                    </ListItem>

                </List>
            </React.Fragment>
        )

        return <nav className={classes.drawer}>
            <Hidden mdUp={true} implementation="css">
                <Drawer
                    id="drawer_mobile"
                    container={container}
                    variant="temporary"
                    anchor={theme?.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={drawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true
                    }}>
                    {drawer}
                </Drawer>
            </Hidden>

            <Hidden smDown={true} implementation="css">
                <Drawer
                    id="drawer_desktop"
                    open={true}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}>
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    }

    private collapseUsers(): void {
        const { usersCollapse } = this.state
        this.setState({ usersCollapse: !usersCollapse })
    }

    private collapsePatients(): void {
        const { collapsePatients } = this.state
        this.setState({ collapsePatients: !collapsePatients })
    }

    private verifyUsersActiveRoute(): boolean {
        const { location: { pathname } } = this.props
        const adminRegex = new RegExp('^/app/admins')
        const hpRegex = new RegExp('^/app/healthprofessionals')
        const caregiverRegex = new RegExp('^/app/caregivers')
        return adminRegex.test(pathname) ||
            hpRegex.test(pathname) ||
            caregiverRegex.test(pathname)
    }

    private verifyPatientActiveRoute(): boolean {
        const { location: { pathname } } = this.props
        return new RegExp('^/app/patients').test(pathname)
    }

    private colorStyle(): { colorStyle: string, borderColorStyle: string } {
        const { location, classes } = this.props
        const pathnames = location.pathname.split('/').filter((x) => x)

        if (pathnames.includes('physical_activities')) {
            return {
                colorStyle: classes.secondaryColor,
                borderColorStyle: classes.secondaryBorderColor
            }
        }

        return {
            colorStyle: classes.primaryColor,
            borderColorStyle: classes.primaryBorderColor
        }
    }
}

const NavBarWithTranslation = withTranslation()(NavBar)

const NavBarWithStyle = withStyles<any>(NavBarStyle, { withTheme: true })(NavBarWithTranslation)

export default withRouter(NavBarWithStyle)
