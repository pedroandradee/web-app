import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import {
    Box,
    createStyles,
    LinearProgress,
    SvgIcon,
    Theme,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core'

import { ReactComponent as LoadingIcon } from '../../assets/imgs/icons/custom/loading-icon.svg'

const Style = (theme: Theme) => createStyles({
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    boxContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
    }
})

/**
 * @private
 * @property {*} [svg]
 * @property {string} [svgSize]
 * @property {string} [viewBox]
 * @property {string} [message]
 * @property {boolean} [withMessage]
 * @property {boolean} [withIcon]
 */
interface Props extends WithTranslation {
    readonly svg?: any
    readonly svgSize?: string
    readonly viewBox?: string
    readonly message?: string
    readonly withMessage?: boolean
    readonly withIcon?: boolean
}

type IJoinProps = Props & WithStyles<typeof Style>

/**
 * Renders a helper component to wait for the data to load.
 * While the data is being requested and you still haven't got the answers, this component is visible to the user.
 * @component
 * @category Components
 * @subcategory table
 * @property {*} [svg] svg file
 * @property {string} [svgSize] svg size
 * @property {string} [viewBox] Icon preview box
 * @property {string} [message] Message that will appear below the icon
 * @property {boolean} [withMessage] Variable that assists in viewing the message
 * @property {boolean} [withIcon] Variable that assists in viewing the icon
 */
class TableLoadingComponent extends Component<IJoinProps> {

    public render() {
        const { t, message, classes, withMessage, withIcon } = this.props
        return <Box>
            <LinearProgress />
            {
                (withIcon || withMessage)
                && <Box m={2} className={classes.boxContent}>
                    {
                        withIcon
                        && <SvgIcon
                            style={{ fontSize: 90 }}
                            component={LoadingIcon} viewBox="0 0 421 290" />
                    }
                    {
                        withMessage
                        && <Typography
                            id="table-loading-message"
                            variant="body2"
                            display="block"
                            align="center"
                            gutterBottom={true}>
                            {message || t('TABLE.HOLD')}
                        </Typography>
                    }
                </Box>
            }
        </Box>
    }
}

const tableLoadingWithTranslation = withTranslation()(TableLoadingComponent)

const TableLoading = withStyles<any>(Style)(tableLoadingWithTranslation)

export default TableLoading
