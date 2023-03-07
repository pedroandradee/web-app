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
import { ANIMATION, TABLES } from '../../../material.theme'
import Cell from '../../table.utils/cell'
import FormatCurrency from '../../formatters/currency'
import { ProtocolItem } from '../../../store/application/models/protocol/protocol.item'



const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {
    readonly index: number
    readonly item: ProtocolItem
}

type IJoinProps = IProps & WithStyles<typeof Style>

export class GeneralConsultationLineComponent extends Component<IJoinProps> {

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
                {/*codigo produto */}
                <Typography variant="caption">
                    {item.cod_produto || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                {/*NCM */}
                <Typography variant="caption">
                    {item.ncm_produto || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                {/*chassi_veiculo */}
                <Typography variant="caption">
                    {item.chassi_veiculo || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                {/*descrição */}
                <Typography variant="caption">
                    {item.descricao_completa_item || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                { /* Total Restituição Declarado*/}
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2} />
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                {/*Total Ressarcir Calculado */}
                <Typography variant="caption">
                    <FormatCurrency value={999.99} maximumFractionDigits={2} />
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                {/*Declados entrada vl. Unit. Venda Presumida */}
                <Typography variant="caption">
                    {item.vl_venda_unitario_presumido || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell}>
                 {/*Declados entrada qtd*/}
                <Typography variant="caption">
                    {item.quantidade_entrada || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                {/*Declados venda vl. Unit. Venda Presumida */}
                <Typography variant="caption">
                    {item.vl_unit_prod_nf_aquis || ' - - '}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                {/*Declados venda qtd*/}
                <Typography variant="caption">
                    {item.quantidade_saida}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
                  {/*Analise do auditor*/}
                <Typography variant="caption">
                    {/*item.analise_auditor||*/" - - "}
                </Typography>
            </Cell>  
            <Cell className={classes.tableCell} align="right">
                  
                <Typography variant="caption">{"  "}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
               {/*Alerta NCM divergente */}
                <Typography variant="caption">
                    {/*item.alerta_ncm_divergente||*/" - - "}
                </Typography>
            </Cell>
            <Cell className={classes.tableCell} align="right">
               
             {/* Alerta qtd*/}
                <Typography variant="caption">
                    {/* item.alerta_qtd_menor||*/" - - "}
                </Typography>
            </Cell>
           
        </TableRow>
    }
}

const GeneralConsultationLineWithTranslation = withTranslation()(GeneralConsultationLineComponent)

const GeneralConsultationLine = withStyles<any>(Style)(GeneralConsultationLineWithTranslation)

export default GeneralConsultationLine