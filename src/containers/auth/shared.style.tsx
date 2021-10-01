import { StyleRules, Theme } from '@material-ui/core'

export const STYLE = (theme: Theme): StyleRules<any, any> => {
    return {
        container: {
            background: theme.palette.primary.main
        },
        formControl: {
            width: '100%',
            margin: theme.spacing(1)
        },
        form: {
            paddingTop: theme.spacing(4)
        },
        button: {
            width: '100%',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: '5px',
            borderRadius: '10px',
            boxShadow: '0px 0px 15px 1px rgba(0,0,0,0.25)',
            color: '#FFFFFF'
        },
        splashContent: {
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 'auto',
            padding: 0,
            width: '100%',
            overflow: 'hidden'
        },
        splash: {
            width: '100%',
            stroke: theme.palette.background.paper,
            fill: theme.palette.background.paper
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative'
        },
        buttonProgress: {
            color: theme.palette.primary.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        },
        title: {
            fontWeight: 'bold',
            letterSpacing: '2px'
        },
        border: {
            '&:before': {
                borderBottom: '1px solid white'
            }
        },
        error: {
            color: theme.palette.error.main
        },
        p1: {
            padding: theme.spacing(1)
        },
        p2: {
            padding: theme.spacing(2)
        },
        p3: {
            padding: theme.spacing(3)
        },
        p4: {
            padding: theme.spacing(4)
        },
        successCommon: {
            fontWeight: 'bold',
            letterSpacing: '2px',
            textAlign: 'center',
            padding: theme.spacing(2)
        },
        successTitleColor: {
            color: theme.palette.secondary.main
        },
        successMessageColor: {
            color: theme.palette.background.paper
        }
    }
}
