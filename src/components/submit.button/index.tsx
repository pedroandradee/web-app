import React, { Component } from 'react'
import { Button, CircularProgress, createStyles, withStyles, WithStyles } from '@material-ui/core'

const Style = () => createStyles({
    container: {
        position: 'relative'
    },
    progress: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto'
    }
})

interface Props extends WithStyles<typeof Style> {
    readonly label: string
    readonly loading: boolean
    readonly color?: 'inherit' | 'primary' | 'secondary' | undefined
    readonly id?: string
    readonly className?: string
    readonly size?: 'small' | 'medium' | 'large'
    readonly variant?: 'text' | 'outlined' | 'contained'
    readonly startIcon?: React.ReactNode
    readonly endIcon?: React.ReactNode
    readonly disabled?: boolean

    onClick?(): void
    onMouseEnter?(): void
}

class SubmitButton extends Component<Props> {

    public render() {
        const {
            id,
            label,
            loading,
            classes,
            color,
            className,
            size,
            variant,
            disabled,
            startIcon,
            endIcon,
            onClick,
            onMouseEnter
        } = this.props
        return <div className={classes.container} onMouseEnter={onMouseEnter}>
            <Button
                id={id}
                type="submit"
                color={color}
                className={className}
                size={size}
                variant={variant}
                disabled={disabled}
                startIcon={startIcon}
                endIcon={endIcon}
                onClick={onClick}>
                {label}
            </Button>
            {
                loading &&
                <CircularProgress size={24} className={classes.progress} color={color}/>
            }
        </div>
    }

}

export default withStyles<any>(Style, { withTheme: true })(SubmitButton)
