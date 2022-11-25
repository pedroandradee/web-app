import React, { Component, lazy } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Container, createStyles, SvgIcon, Theme, withStyles, WithStyles } from '@material-ui/core'
import clsx from 'clsx'
import { withTranslation, WithTranslation } from 'react-i18next'
import { ThemeMode } from '../../../material.theme'
import { ReactComponent as LogoLight } from '../../../assets/imgs/logo_light.svg'
import { ReactComponent as LogoDark } from '../../../assets/imgs/logo_dark.svg'

const Footer = lazy(() => import('../footer'))

const WIDTH_CONTAINER = 350
const HEIGHT_CONTAINER = 622

const Style = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default,
        padding: 0,
        margin: 0
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 auto',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0)
        }
    },
    container: {
        position: 'relative',
        background: theme.palette.background.paper,
        width: `${WIDTH_CONTAINER}px`,
        height: `${HEIGHT_CONTAINER}px`,
        padding: theme.spacing(2),
        margin: 'auto',
        borderRadius: theme.spacing(2),
        overflow: 'hidden',
        boxShadow: `0px 0px 15px 1px ${theme.palette.text.primary}`
    },
    logoContent: {
        width: `${WIDTH_CONTAINER - theme.spacing(4)}px`,
        position: 'absolute',
        zIndex: 1
    },
    logo: {
        width: 200,
        height: 100
    },
    children: {
        position: 'absolute',
        width: `${WIDTH_CONTAINER - theme.spacing(4)}px`,
        zIndex: 2,
        marginTop: '170px'
    }
})

interface SvgOptions {
    readonly width: number
    readonly height: number
    readonly scale: number
}

interface Props {
    readonly title: string
    readonly rootClass?: string
    readonly className?: string
    readonly footerClassName?: string
    readonly splashContent?: string
    readonly splash?: string
    readonly svgOptions?: SvgOptions
    readonly themeMode: ThemeMode
}

type JoinProps = Props & WithTranslation & WithStyles<typeof Style>

class CentralWrapper extends Component<JoinProps> {

    public render() {
        const {
            classes,
            children,
            title,
            className,
            splashContent,
            splash,
            svgOptions,
            rootClass,
            footerClassName,
            themeMode
        } = this.props

        const scale = svgOptions?.scale ? `scale(${svgOptions?.scale})` : 'scale(3.8)'

        return <React.Fragment>

            <Container maxWidth={false} className={clsx(classes.root, rootClass)}>

                <Helmet>
                    <title>{title}</title>
                </Helmet>

                <Container className={classes.content}>

                    <Container maxWidth="sm" className={clsx(classes.container, className)}>

                        {
                            !!splashContent && <Box
                                display="flex"
                                justifyContent="center"
                                p={0}
                                className={splashContent}>
                                <svg
                                    width={svgOptions?.width}
                                    height={svgOptions?.height}
                                    viewBox={`0 0 ${svgOptions?.width} ${svgOptions?.height}`}
                                    version="1.1"
                                    id="svg8">
                                    <defs id="defs2"/>
                                    <g id="scale" transform={scale}>
                                        <g id="translate"
                                           transform="translate(-34.756712,-69)">
                                            <path className={splash}
                                                  d="m 130.0312,75.382191 c -23.71022,-4.893858 -48.949038,-7.420216 -73.092257,-4.5327 -5.462316,0.653291 -10.923234,1.165137 -16.358981,2.077035 -1.285816,0.215701 -4.577868,0.868458 -5.751277,1.320499 0,0 -0.05352,4.704592 -0.05352,6.176559 v 16.622834 17.414412 c 0,2.66941 -0.01543,10.02898 -0.01543,10.02898 0.887367,-0.002 6.484242,-0.003 9.250335,-0.003 h 11.345744 52.507051 13.45659 c 2.55357,0 8.69701,0.006 8.69701,0.006 0.2995,-25.213674 0.22655,-25.758292 0.0147,-49.111569 z"/>
                                        </g>
                                    </g>
                                </svg>

                            </Box>
                        }

                        <Box
                            display="flex"
                            justifyContent="center"
                            p={4}
                            className={classes.logoContent}>
                            <SvgIcon
                                component={themeMode === ThemeMode.LIGHT ? LogoLight : LogoDark}
                                viewBox="0 0 164 62"
                                className={classes.logo}/>
                        </Box>

                        <Box className={classes.children}>
                            {children}
                        </Box>

                    </Container>

                </Container>

                <Footer className={footerClassName}/>

            </Container>
        </React.Fragment>
    }
}

const wrapperWithTranslation = withTranslation()(CentralWrapper)

export default withStyles<any>(Style, { withTheme: true })(wrapperWithTranslation)
