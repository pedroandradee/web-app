import React, { Component } from 'react'
import { 
    createStyles, 
    TableRow, 
    Theme, 
    Typography, 
    withStyles, 
    WithStyles 
} from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'
import { ANIMATION, TABLES } from '../../material.theme'
import Cell from '../table.utils/cell'
import FormatCurrency from '../formatters/currency'



const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {
    readonly index: number
    readonly item: any
}

type IJoinProps = IProps & WithStyles<typeof Style>

export class ArchiveLineComponent extends Component<IJoinProps> {
    
    public render() {
        const {
            classes,
            index,
            item
        } = this.props

        return <TableRow
            key={`table_row_${index}`}
            className={classes.fadeIn1}>

           <Cell className={classes.tableCell}>
                <Typography variant="caption">
                    {index+1 || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                <Typography variant="caption">
                    {item.protocol || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                <Typography variant="caption">
                    {item.name || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
            <Typography variant="caption">
                    {item.status_av || ' - - '}
                </Typography>
            </Cell>
           
        </TableRow>
    }
}

const ArchiveLineWithTranslation = withTranslation()(ArchiveLineComponent)

const ArchiveLine = withStyles<any>(Style)(ArchiveLineWithTranslation)

export default ArchiveLine