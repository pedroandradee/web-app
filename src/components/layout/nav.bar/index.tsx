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
import { 
    Home,
    InsertDriveFile
} from '@material-ui/icons'
import clsx from 'clsx'
import { ThemeMode } from '../../../material.theme'
import { ReactComponent as LogoLight } from '../../../assets/imgs/logo_light.svg'
import { ReactComponent as LogoDark } from '../../../assets/imgs/logo_dark.svg'

interface Props extends WithStyles<typeof NavBarStyle, true> {
    readonly mobileOpen: boolean
    readonly desktopOpen: boolean
    readonly themeMode: ThemeMode

    drawerToggle(): void

    closeMobileView(): void
}

type IProps = Props & WithTranslation & RouteComponentProps

export const DRAWER_WIDTH = 250

const NavBarStyle = (theme: Theme) => createStyles({
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0
        },
        transition: '.2s all',
        border: 'none'
    },
    drawerLogo: {
        textAlign: 'center',
        padding: theme.spacing(2)
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        transition: '.3s all',
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

class NavBar extends Component<IProps> {

    constructor(props: IProps) {
        super(props)
        /* Bind Context */
        this.colorStyle = this.colorStyle.bind(this)
    }

    public render() {
        const {
            t,
            classes,
            drawerToggle,
            mobileOpen,
            desktopOpen,
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
                    <ListItem
                        id="list_item_home"
                        button={true}
                        component={NavLink}
                        to="/app/archives"
                        onClick={closeMobileView}
                        activeClassName={clsx(classes.navActive, colorStyle)}>
                        <ListItemIcon><InsertDriveFile/></ListItemIcon>
                        <ListItemText primary={t('DRAWER.ARCHIVE')}/>
                    </ListItem>

                </List>
            </React.Fragment>
        )

        return <nav className={desktopOpen ? classes.drawer : ''}>
            <Hidden lgUp={true} implementation="css">
                <Drawer
                    id="drawer_mobile"
                    container={container}
                    variant="temporary"
                    anchor={theme?.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={drawerToggle}
                    classes={{ paper: classes.drawerPaper }}
                    ModalProps={{ keepMounted: true }}>
                    {drawer}
                </Drawer>
            </Hidden>

            <Hidden mdDown={true} implementation="css">
                <Drawer
                    id="drawer_desktop"
                    open={desktopOpen}
                    variant="persistent"
                    classes={{ paper: classes.drawerPaper }}>
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
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
