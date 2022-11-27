import React, { Component, ReactNode } from 'react'
import clsx from 'clsx'

import { createStyles, TableCell, Theme, withStyles, WithStyles } from '@material-ui/core'
import { TABLES } from '../../material.theme'

const Style = (theme: Theme) => createStyles({
    ...TABLES(theme)
})

/**
 * @private
 * @property {React.ReactNode} [children] Child element to be rendered inside parent element
 * @property {string} [className] Component Styles
 * @property {number} [rowSpan] Number of lines that will be occupied
 * @property {number} [colSpan] Number of columns that will be occupied
 * @property {number} [width] element width
 * @property {*} [style] Parent element style
 */
interface IProps extends WithStyles<typeof Style> {
    readonly align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
    readonly children?: ReactNode
    readonly className?: string
    readonly rowSpan?: number
    readonly colSpan?: number
    readonly width?: number | string
    readonly style?: any
}

/**
 * Custom table cell component
 * @component
 * @category Functional Component
 * @subcategory table
 * @property {React.ReactNode} [children] Child element to be rendered inside parent element
 * @property {string} [className] Component Styles
 * @property {number} [rowSpan] Number of lines that will be occupied
 * @property {number} [colSpan] Number of columns that will be occupied
 * @property {number} [width] element width
 * @property {*} [style] Parent element style
 * @returns {React.ReactNode} TableCell
 */
class CellComponent extends Component<IProps> {
    public render() {
        const { classes, children, className, rowSpan, colSpan, width, style, align } = this.props
        return <TableCell
            className={clsx(classes.tableCell, className)}
            rowSpan={rowSpan}
            size="small"
            colSpan={colSpan}
            width={width}
            align={align || 'center'}
            style={style}>
            {children || ''}
        </TableCell>
    }
}

const Cell = withStyles<any>(Style)(CellComponent)

export default Cell
