import React, { Component } from 'react'
import { createStyles, TableRow, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import { ANIMATION, TABLES } from '../../../material.theme'
import { withTranslation, WithTranslation } from 'react-i18next'
import { NfeItem } from '../../../store/application/models/protocol/nfe.item'
import Cell from '../../table.utils/cell'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {
    readonly index: number
    readonly item: NfeItem
}

type IJoinProps = IProps & WithStyles<typeof Style>

class NfeLineComponent extends Component<IJoinProps> {

    public render() {
        const {
            classes,
            item
        } = this.props

        return <TableRow>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.cod_produto || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.ncm || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.chassi_veiculo || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.descricao_item_produto || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.vl_ressar_icms_st_prod || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.vl_venda_unitario_presumido || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.quantidade_entrada || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.vl_venda_unitario_presumido || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.quantidade_saida || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.vl_venda_unitario_presumido || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {item.vl_ressar_icms_st_prod || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCellBordered}>
                <Typography>
                    {' - - '}
                </Typography>
            </Cell>
        </TableRow>
    }
}

const NfeLineWithTranslation = withTranslation()(NfeLineComponent)

const NfeLine = withStyles<any>(Style)(NfeLineWithTranslation)

export default NfeLine