import React, { Component } from 'react'

import { Link as RouterLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Breadcrumbs, createStyles, Hidden, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'

export const BreadCrumbStyle = (theme: Theme) => createStyles({
    breadcrumbs: {
        padding: '45px 0px 20px 0px'
    },
    link: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
})

interface IProps extends WithStyles<typeof BreadCrumbStyle> {
    readonly breadCrumbLast: string
}

type IJoinProps = IProps & WithTranslation & RouteComponentProps

class BreadCrumbComponent extends Component<IJoinProps> {

    private static getBreadCrumbName(listId: string[] | undefined): any {
        // let primaryId: string = ''
        // let secondaryId: string = ''
        // if (listId) {
        //     primaryId = listId?.length ? listId[0] : ''
        //     secondaryId = listId?.length > 1 ? listId[1] : ''
        // }
        return {
            '/app': 'DRAWER.HOME',
            '/app/myprofile': 'BREAD_CRUMB.PROFILE'
        }
    }

    constructor(props: IJoinProps) {
        super(props)
        BreadCrumbComponent.getBreadCrumbName = BreadCrumbComponent.getBreadCrumbName.bind(this)
    }

    public render() {
        const {
            location,
            breadCrumbLast,
            classes,
            t
        } = this.props

        const pathnames = location
            ?.pathname
            ?.split('/')
            ?.filter((x) => x)
        const resourceId: string[] = pathnames.filter(path => path.match(/[a-fA-F0-9]{24}/g))
        const content: React.ReactNode = (
            pathnames
                .filter((value: string) => value !== 'home')
                .map((value: string, index: number) => {
                    const last = index === pathnames.length - 1
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`
                    return last ? (
                        <Typography color="textPrimary" key={to} noWrap={true}>
                            {t(BreadCrumbComponent.getBreadCrumbName(resourceId)[to]) || breadCrumbLast}
                        </Typography>
                    ) : (
                        <RouterLink
                            color="inherit"
                            to={to}
                            key={to}
                            className={classes.link}>
                            {t(BreadCrumbComponent.getBreadCrumbName(resourceId)[to]) || breadCrumbLast}
                        </RouterLink>
                    )
                })
        )

        return <React.Fragment>
            <Hidden xsDown={true}>
                <Breadcrumbs id="breadcrumb" maxItems={4} aria-label="breadcrumb" className={classes.breadcrumbs}>
                    {
                        content
                    }
                </Breadcrumbs>
            </Hidden>

            <Hidden smUp={true}>
                <Breadcrumbs
                    id="breadcrumb"
                    maxItems={3}
                    itemsAfterCollapse={2}
                    itemsBeforeCollapse={0}
                    aria-label="breadcrumb"
                    className={classes.breadcrumbs}>
                    {
                        content
                    }
                </Breadcrumbs>
            </Hidden>
        </React.Fragment>
    }
}

const BreadCrumbWithTranslation = withTranslation()(BreadCrumbComponent)

const BreadCrumbWithStyle = withStyles<any>(BreadCrumbStyle)(BreadCrumbWithTranslation)

export default withRouter(BreadCrumbWithStyle)
