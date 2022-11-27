import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import { Box, createStyles, SvgIcon, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'

const Style = (theme: Theme) => createStyles({
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        width: '100%'
    },
    boxContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
})

/**
 * @private
 * @property {*} [svg]
 * @property {string} [svgSize]
 * @property {string} [viewBox]
 * @property {string} [message]
 */
interface Props extends WithTranslation {
    readonly svg?: any
    readonly svgSize?: string
    readonly viewBox?: string
    readonly message?: string
}

type IJoinProps = Props & WithStyles<typeof Style>

/**
 * Renders a component when no data is returned after completing a request.
 * @component
 * @category Components
 * @subcategory table
 * @property {*} [svg] svg file
 * @property {string} [svgSize] svg size
 * @property {string} [viewBox] Icon preview box
 * @property {string} [message] Message that will appear below the icon
 */
class TableEmptyComponent extends Component<IJoinProps> {

    /**
     * @public
     * @returns {React.ReactNode} Table empty
     */
    public render() {

        const { t, message, classes, svg, viewBox, svgSize } = this.props

        return <Box className={classes.box}>
            <Box className={classes.boxContent}>
                <SvgIcon id="svg-empty"
                         component={svg}
                         style={{ fontSize: svgSize }}
                         viewBox={viewBox}/>
                <Typography
                    id="table-empty-message"
                    variant="body2"
                    display="block"
                    align="center"
                    gutterBottom={true}>
                    {message || t('TABLE.DEFAULT_EMPTY')}
                </Typography>
            </Box>
        </Box>
    }
}

const tableEmptyWithTranslation = withTranslation()(TableEmptyComponent)

const TableEmpty = withStyles<any>(Style)(tableEmptyWithTranslation)

export default TableEmpty
