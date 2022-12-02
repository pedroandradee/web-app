import React, { Component, lazy } from 'react'

import { TableRow } from '@material-ui/core'

import Cell from './cell'

const TableLoading = lazy(() => import('../loading'))

/**
 * {@link TableRowLoading} component properties setting interface.
 *
 * @property {number} numberOfColumns Total number of columns
 */
interface IProps {
    readonly numberOfColumns: number
}

/**
 * Component used to render load line.
 * @alias TableRowLoading
 * @component
 * @category Components
 * @property {number} numberOfColumns Total number of columns
 *
 * @extends {Component}
 */
class TableRowLoading extends Component<IProps> {
    /**
     * Render method.
     * Triggering method to render the component.
     * @return {JSX.Element} Component to be rendered.
     */
    public render() {
        const { numberOfColumns } = this.props

        return <TableRow>
            <Cell
                style={{ padding: 0, margin: 0 }}
                colSpan={numberOfColumns}>
                <TableLoading withIcon={false} withMessage={false} message=""/>
            </Cell>
        </TableRow>
    }
}

export default TableRowLoading
