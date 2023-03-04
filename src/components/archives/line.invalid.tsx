import {
    TableRow,
    Theme,
    withStyles,
    createStyles,
    WithStyles,
    Tooltip,
    Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { ANIMATION, TABLES } from '../../material.theme'
import { ArchiveInvalidate } from '../../store/application/models/archive/archive.invalidate'
import Cell from '../table.utils/cell'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme),
    invalidCell: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.background.paper
    }
})

interface IProps extends WithTranslation {
    readonly item: ArchiveInvalidate
}

type IJoinProps = IProps & WithStyles<typeof Style>

const verificaVendaPresumidoUnitarioxSaida = (item:any) => {
   /* console.log(item.vl_venda_unitario_presumido_x_qtd_saida,"=",
     Number((item.vl_venda_unitario_presumido || 0) * (item.quantidade_saida || 0).toFixed(2)))*/
    if (item.vl_venda_unitario_presumido_x_qtd_saida !==
        Number((item.vl_venda_unitario_presumido || 0) * (item.quantidade_saida || 0).toFixed(2))) {
        /*console.log("vl_venda_unitario_presumido_x_qtd_saida",
            item.vl_venda_unitario_presumido_x_qtd_saida,
            item.vl_venda_unitario_presumido || 0,
            item.quantidade_saida || 0)*/
        return true
    }
    return false
}
const verificaSaldoUnitario = (item:any)=>{
     if (item.saldo_st_unitario !==
        Number(((item.saldo_st_total || 0) / (item.quantidade_saldo || 1)).toFixed(2))) {
        /*console.log("saldo_st_unitario diferente",
            item.saldo_st_unitario, Number(((item.saldo_st_total || 0) / (item.quantidade_saldo || 1)).toFixed(2)),
            item.saldo_st_total || 0, item.quantidade_saldo || 1)*/
        return true
    }
    return false
}
export class ArchiveInvalidLineComponent extends Component<IJoinProps> {

 


    public render() {
        const {
            t,
            classes,
            item
        } = this.props

        return <TableRow
            key={`table_row_invalid_${item.table_index}`}
            className={classes.fadeIn1}>
            <Cell className={classes.tableCell}>
                <Tooltip title={`${t('ARCHIVES.INVALID.DIALOG.TABLE_HEAD.TOOLTIP')}`}>
                    <Typography>
                        {item.table_index}
                    </Typography>
                </Tooltip>
            </Cell>
            {
          
                /*Object.entries(item).map((value, index)=>{ 

                    return(<Cell key={`${item}-${index}`}
                        className={
                           value[1] === undefined ?
                                clsx(classes.tableCell, classes.invalidCell) :
                                classes.tableCell}>
                        {value[1]|| ' - - '}
                    </Cell>
                    )
                })
            */}
            <Cell 
                className={
                    item.cd_uf_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.cd_uf_nf_aquis || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.cod_produto === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.cod_produto || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.descricao_completa_item=== undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.descricao_completa_item || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.ncm_produto === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.ncm_produto || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.gtin_ean === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.gtin_ean || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.num_item_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.num_item_nf_aquis|| ' - - '}
            </Cell>
            <Cell 
                className={
                    item.aliquota_entrada === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.aliquota_entrada || ' - - '}
              
            </Cell>
            <Cell 
                className={
                    item.dta_emiss_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.dta_emiss_nf_aquis || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.num_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.num_nf_aquis || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.num_chv_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {  item.num_chv_nf_aquis|| ' - - '}
            </Cell>
            <Cell 
                className={
                    item.quantidade_entrada === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.quantidade_entrada || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_bc_icms_op_prop_prod_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.vl_bc_icms_op_prop_prod_nf_aquis|| ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_icms_op_prop_prod_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.vl_icms_op_prop_prod_nf_aquis  || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.tipo_bc_icms_st_prod_nf_aquis=== undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.tipo_bc_icms_st_prod_nf_aquis|| ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_pauta_icms_st_prod=== undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.vl_pauta_icms_st_prod || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.perc_mva_prod === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.perc_mva_prod  || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_bc_icms_st_prod_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.vl_bc_icms_st_prod_nf_aquis  || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_icms_st_item_nf_aquis === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {  item.vl_icms_st_item_nf_aquis  || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.num_item_nf_saida === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.num_item_nf_saida|| ' - - '}
            </Cell>
            <Cell 
                className={
                    item.dta_emiss_nf_saida === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.dta_emiss_nf_saida  || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_alq_icms_st_prod_oper_saida === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.vl_alq_icms_st_prod_oper_saida || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.quantidade_saida=== undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.quantidade_saida|| ' - - '}
            </Cell>
            <Cell 
                className={
                    item.num_item_nf_saida=== undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {  item.num_item_nf_saida|| ' - - '}
            </Cell>
            <Cell 
                className={
                    item.descricao_item_produto === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.descricao_item_produto || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_unit_prod_nf_saida === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.vl_unit_prod_nf_saida || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_desc_prod_nf_saida === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.vl_desc_prod_nf_saida || ' - - '}
            </Cell>
            <Cell 
                className={
                    (item.vl_venda_unitario_presumido === undefined||verificaSaldoUnitario(item))?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.vl_venda_unitario_presumido|| ' - - '}
            </Cell>
            <Cell 
                className={
                    (item.vl_venda_unitario_presumido_x_qtd_saida=== undefined ||verificaVendaPresumidoUnitarioxSaida(item))?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.vl_venda_unitario_presumido_x_qtd_saida || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_bc_icms_st_prod_nf_saida === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {item.vl_bc_icms_st_prod_nf_saida  || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.quantidade_saldo=== undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {  item.quantidade_saldo || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.saldo_st_unitario === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.saldo_st_unitario|| ' - - '}
            </Cell>
            <Cell 
                className={
                    item.saldo_st_total === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                {  item.saldo_st_total || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.vl_ressar_icms_st_prod === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.vl_ressar_icms_st_prod || ' - - '}
            </Cell>
            <Cell 
                className={
                    item.outras_operacoes_que_nao_geram_ressarcimento === undefined ?
                    clsx(classes.tableCell, classes.invalidCell) :
                    classes.tableCell}>
                { item.outras_operacoes_que_nao_geram_ressarcimento  || ' - - '}
            </Cell>
        </TableRow>
    }
}

const ArchiveInvalidLineWithTranslation = withTranslation()(ArchiveInvalidLineComponent)

const ArchiveInvalidLine = withStyles<any>(Style)(ArchiveInvalidLineWithTranslation)

export default ArchiveInvalidLine
