import { JsonUtils } from "../../utils/json.util"


export class Archive {
    private _cd_uf_nf_aquis: string | undefined
    private _cod_produto: number | undefined
    private _descricao: string | undefined
    private _ncm_produto: number | undefined
    private _gtin_ean: number | undefined
    private _num_item_nf_aquis: number | undefined
    private _aliquota_interna: number | undefined
    private _dta_emiss_nf_aquis: string | undefined
    private _num_nf_aquis: number | undefined
    private _num_chv_nf_aquis: number | undefined
    private _serie_entrada: number | undefined
    private _quantidade_entrada: number | undefined
    private _vl_unit_prod_nf_aquis: string | undefined
    private _vl_bc_icms_op_prop_prod_nf_aquis: number | undefined
    private _vl_icms_op_prop_prod_nf_aquis: number | undefined
    private _tipo_bc_icms_st_prod_nf_aquis: string | undefined
    private _vl_pauta_icms_st_prod: number | undefined
    private _perc_mva_prod: string | undefined
    private _vl_bc_icms_st_prod_nf_aquis: number | undefined
    private _vl_icms_st_item_nf_aquis: number | undefined
    private _num_nf_saida: string | undefined
    private _num_chv_saida: string | undefined
    private _dta_emiss_nf_saida: string | undefined
    private _vl_alq_icms_st_prod_oper_saida: string | undefined
    private _quantidade_saida: number | undefined
    private _num_item_nf_saida: string | undefined
    private _descricao_item_produto: string | undefined
    private _vl_unit_prod_nf_saida: number | undefined
    private _vl_desc_prod_nf_saida: string | undefined
    private _vl_venda_unitario_presumido: number | undefined
    private _vl_venda_unitario_presumido_x_qtd_saida: number | undefined
    private _vl_bc_icms_st_prod_nf_saida: number | undefined
    private _quantidade_saldo: number | undefined
    private _saldo_st_unitario: number | undefined
    private _saldo_st_total: number | undefined
    private _vl_ressar_icms_st_prod: number | undefined
    private _outras_operacoes_que_nao_geram_ressarcimento: number | undefined

    get cd_uf_nf_aquis(): string | undefined {
        return this._cd_uf_nf_aquis
    }

    set cd_uf_nf_aquis(value: string | undefined) {
        this._cd_uf_nf_aquis = value
    }

    

    public fromJSON(json: any): Archive {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.cd_uf_nf_aquis !== undefined) {
            this.cd_uf_nf_aquis = json.cd_uf_nf_aquis
        }

        return this
    }

    public toJSON(): any {
        return {
            cd_uf_nf_aquis: this.cd_uf_nf_aquis || undefined
        }
    }

    public exportHeaders(): any {
        return [
            'cd_uf_nf_aquis',
            'cod_produto',
            'descricao',
            'ncm_produto',
            'gtin_ean',
            'num_item_nf_aquis',
            'aliquota_interna',
            'dta_emiss_nf_aquis',
            'num_nf_aquis',
            'num_chv_nf_aquis',
            'serie_entrada',
            'quantidade_entrada',
            'vl_unit_prod_nf_aquis',
            'vl_bc_icms_op_prop_prod_nf_aquis',
            'vl_icms_op_prop_prod_nf_aquis',
            'tipo_bc_icms_st_prod_nf_aquis',
            'vl_pauta_icms_st_prod',
            'perc_mva_prod',
            'vl_bc_icms_st_prod_nf_aquis',
            'vl_icms_st_item_nf_aquis',
            'num_nf_saida',
            'num_chv_saida',
            'dta_emiss_nf_saida',
            'vl_alq_icms_st_prod_oper_saida',
            'quantidade_saida',
            'num_item_nf_saida',
            'descricao_item_produto',
            'vl_unit_prod_nf_saida',
            'vl_desc_prod_nf_saida',
            'vl_venda_unitario_presumido',
            'vl_venda_unitario_presumido_x_qtd_saida',
            'vl_bc_icms_st_prod_nf_saida',
            'quantidade_saldo',
            'saldo_st_unitario',
            'saldo_st_total',
            'vl_ressar_icms_st_prod',
            'outras_operacoes_que_nao_geram_ressarcimento'
        ]
    }
}