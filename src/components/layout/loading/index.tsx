import React, { Component } from 'react'
import { Box, CircularProgress, createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'

interface Props extends WithStyles<typeof Style> {
    readonly id?: string
    readonly message?: string
}

const Style = (theme: Theme) => createStyles({
    external: {
        position: 'fixed',
        zIndex: 2000,
        background: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0
    },
    internal: {
        position: 'absolute',
        background: theme.palette.background.paper,
        borderRadius: '5px',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

class Loading extends Component <Props> {

    public render() {
        const { id, message, classes } = this.props
        return (
            <Box className={classes.external}>

                <Box className={classes.internal} id={id}>

                    <CircularProgress id={`${id ? id + '_' : ''}circular_progress`}/>

                    {
                        message && <Typography align="center" id={`${id ? id + '_' : ''}message`}>{message}</Typography>
                    }

                </Box>

            </Box>
        )
    }
}

export default withStyles<any>(Style, { withTheme: true })(Loading)
