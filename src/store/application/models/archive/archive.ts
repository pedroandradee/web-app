import { JsonUtils } from "../../utils/json.util"

/**
 * Archive
 * @category Models
 * @subcategory archive
 * @property {number} [aliquota_entrada]
 * @property {string} [cd_uf_nf_aquis]
 * @property {number} [chassi_veiculo]
 * @property {number} [cod_produto]
 * @property {string} [descricao_completa_item]
 * @property {string} [descricao_item_produto]
 * @property {string} [dta_emiss_nf_aquis]
 * @property {string} [dta_emiss_nf_saida]
 * @property {number} [gtin_ean]
 * @property {number} [ncm]
 * @property {number} [ncm_produto]
 * @property {string} [num_chv_saida]
 * @property {number} [num_chv_nf_aquis]
 * @property {number} [!num_item_nf_aquis]
 * @property {string} [num_item_nf_saida]
 * @property {number} [num_nf_aquis]
 * @property {string} [num_nf_saida]
 * @property {number} [outras_operacoes_que_nao_geram_ressarcimento]
 * @property {number} [pmpf]
 * @property {string} [perc_mva_prod]
 * @property {number} [quantidade_saida]
 * @property {number} [quantidade_saldo]
 * @property {number} [quantidade_entrada]
 * @property {number} [saldo_st_total]
 * @property {number} [saldo_st_unitario]
 * @property {number} [!serie_entrada]
 * @property {string} [tipo_bc_icms_st_prod_nf_aquis]
 * @property {number} [unidade_venda]
 * @property {string} [vl_alq_icms_st_prod_oper_saida]
 * @property {number} [vl_bc_icms_op_prop_prod_nf_aquis]
 * @property {number} [vl_bc_icms_st_prod_nf_aquis]
 * @property {number} [!vl_bc_icms_st_prod_nf_saida]
 * @property {string} [vl_desc_prod_nf_saida]
 * @property {number} [vl_icms_st_item_nf_aquis]
 * @property {number} [vl_icms_st_prod_nf_saida]
 * @property {number} [vl_icms_op_prop_prod_nf_aquis]
 * @property {number} [vl_pauta_icms_st_prod]
 * @property {number} [vl_ressar_icms_st_prod]
 * @property {string} [!vl_unit_prod_nf_aquis]
 * @property {number} [vl_unit_prod_nf_saida]
 * @property {number} [vl_venda_unitario_presumido]
 * @property {number} [vl_venda_unitario_presumido_x_qtd_saida]
 */
export class Archive {
    private _aliquota_entrada: number | undefined
    private _cd_uf_nf_aquis: string | undefined
    private _chassi_veiculo: number | undefined
    private _cod_produto: number | undefined
    private _descricao_completa_item: string | undefined
    private _descricao_item_produto: string | undefined
    private _dta_emiss_nf_aquis: string | undefined
    private _dta_emiss_nf_saida: string | undefined
    private _gtin_ean: number | undefined
    private _ncm: number | undefined
    private _ncm_produto: number | undefined
    private _num_chv_saida: string | undefined
    private _num_chv_nf_aquis: number | undefined
    //private _num_item_nf_aquis: number | undefined
    private _num_item_nf_saida: string | undefined
    private _num_nf_aquis: number | undefined
    private _num_nf_saida: string | undefined
    private _outras_operacoes_que_nao_geram_ressarcimento: number | undefined
    private _pmpf: number | undefined
    private _perc_mva_prod: string | undefined
    private _quantidade_saida: number | undefined
    private _quantidade_saldo: number | undefined
    private _quantidade_entrada: number | undefined
    private _saldo_st_total: number | undefined
    private _saldo_st_unitario: number | undefined
    //private _serie_entrada: number | undefined
    private _tipo_bc_icms_st_prod_nf_aquis: string | undefined
    private _unidade_venda: number | undefined
    private _vl_bc_icms_op_prop_prod_nf_aquis: number | undefined
    private _vl_bc_icms_st_prod_nf_aquis: number | undefined
    private _vl_bc_icms_st_prod_nf_saida: number | undefined
    //private _vl_alq_icms_st_prod_oper_saida: string | undefined
    private _vl_desc_prod_nf_saida: string | undefined
    private _vl_icms_st_item_nf_aquis: number | undefined
    private _vl_icms_st_prod_nf_saida: number | undefined
    private _vl_icms_op_prop_prod_nf_aquis: number | undefined
    private _vl_pauta_icms_st_prod: number | undefined
    private _vl_ressar_icms_st_prod: number | undefined
    //private _vl_unit_prod_nf_aquis: string | undefined
    private _vl_unit_prod_nf_saida: number | undefined
    private _vl_venda_unitario_presumido: number | undefined
    private _vl_venda_unitario_presumido_x_qtd_saida: number | undefined

    get aliquota_entrada(): number | undefined {
        return this._aliquota_entrada
    }

    set aliquota_entrada(value: number | undefined) {
        this._aliquota_entrada = value
    }

    get cd_uf_nf_aquis(): string | undefined {
        return this._cd_uf_nf_aquis
    }

    set cd_uf_nf_aquis(value: string | undefined) {
        this._cd_uf_nf_aquis = value
    }

    get chassi_veiculo(): number | undefined {
        return this._chassi_veiculo
    }

    set chassi_veiculo(value: number | undefined) {
        this._chassi_veiculo = value
    }
    get cod_produto(): number | undefined {
        return this._cod_produto
    }

    set cod_produto(value: number | undefined) {
        this._cod_produto = value
    }

    get descricao_completa_item(): string | undefined {
        return this._descricao_completa_item
    }

    set descricao_completa_item(value: string | undefined) {
        this._descricao_completa_item = value
    }

    get descricao_item_produto(): string | undefined {
        return this._descricao_item_produto
    }

    set descricao_item_produto(value: string | undefined) {
        this._descricao_item_produto = value
    }

    get dta_emiss_nf_aquis(): string | undefined {
        return this._dta_emiss_nf_aquis
    }

    set dta_emiss_nf_aquis(value: string | undefined) {
        this._dta_emiss_nf_aquis = value
    }

    get dta_emiss_nf_saida(): string | undefined {
        return this._dta_emiss_nf_saida
    }

    set dta_emiss_nf_saida(value: string | undefined) {
        this._dta_emiss_nf_saida = value
    }

    get gtin_ean(): number | undefined {
        return this._gtin_ean
    }

    set gtin_ean(value: number | undefined) {
        this._gtin_ean = value
    }

    get ncm(): number | undefined {
        return this._ncm
    }
    set ncm(value: number | undefined) {
        this._ncm
    }

    get ncm_produto(): number | undefined {
        return this._ncm_produto
    }

    set ncm_produto(value: number | undefined) {
        this._ncm_produto = value
    }

    get num_chv_saida(): string | undefined {
        return this._num_chv_saida
    }

    set num_chv_saida(value: string | undefined) {
        this._num_chv_saida = value
    }
    get num_chv_nf_aquis(): number | undefined {
        return this._num_chv_nf_aquis
    }

    set num_chv_nf_aquis(value: number | undefined) {
        this._num_chv_nf_aquis = value
    }

    /*get num_item_nf_aquis(): number | undefined {
        return this._num_item_nf_aquis
    }

    set num_item_nf_aquis(value: number | undefined) {
        this._num_item_nf_aquis = value
    }*/

    get num_item_nf_saida(): string | undefined {
        return this._num_item_nf_saida
    }

    set num_item_nf_saida(value: string | undefined) {
        this._num_item_nf_saida = value
    }

    get num_nf_aquis(): number | undefined {
        return this._num_nf_aquis
    }

    set num_nf_aquis(value: number | undefined) {
        this._num_nf_aquis = value
    }

    get num_nf_saida(): string | undefined {
        return this._num_nf_saida
    }

    set num_nf_saida(value: string | undefined) {
        this._num_nf_saida = value
    }

    get outras_operacoes_que_nao_geram_ressarcimento(): number | undefined {
        return this._outras_operacoes_que_nao_geram_ressarcimento
    }

    set outras_operacoes_que_nao_geram_ressarcimento(value: number | undefined) {
        this._outras_operacoes_que_nao_geram_ressarcimento = value
    }


    get pmpf(): number | undefined {
        return this._pmpf
    }

    set pmpf(value: number | undefined) {
        this._pmpf = value
    }

    get perc_mva_prod(): string | undefined {
        return this._perc_mva_prod
    }

    set perc_mva_prod(value: string | undefined) {
        this._perc_mva_prod = value
    }

    get quantidade_saida(): number | undefined {
        return this._quantidade_saida
    }

    set quantidade_saida(value: number | undefined) {
        this._quantidade_saida = value
    }

    get quantidade_saldo(): number | undefined {
        return this._quantidade_saldo
    }

    set quantidade_saldo(value: number | undefined) {
        this._quantidade_saldo = value
    }

    get quantidade_entrada(): number | undefined {
        return this._quantidade_entrada
    }

    set quantidade_entrada(value: number | undefined) {
        this._quantidade_entrada = value
    }

    /*  get serie_entrada(): number | undefined {
          return this._serie_entrada
     } 
     set serie_entrada(value: number | undefined) {
          this._serie_entrada = value
      }
      }*/

    get saldo_st_total(): number | undefined {
        return this._saldo_st_total
    }

    set saldo_st_total(value: number | undefined) {
        this._saldo_st_total = value
    }

    get saldo_st_unitario(): number | undefined {
        return this._saldo_st_unitario
    }

    set saldo_st_unitario(value: number | undefined) {
        this._saldo_st_unitario = value
    }

    get tipo_bc_icms_st_prod_nf_aquis(): string | undefined {
        return this._tipo_bc_icms_st_prod_nf_aquis
    }
    set tipo_bc_icms_st_prod_nf_aquis(value: string | undefined) {
        this._tipo_bc_icms_st_prod_nf_aquis = value
    }

    get unidade_venda(): number | undefined {
        return this.unidade_venda
    }

    set unidade_venda(value: number | undefined) {
        this._unidade_venda = value
    }

    get vl_bc_icms_op_prop_prod_nf_aquis(): number | undefined {
        return this._vl_bc_icms_op_prop_prod_nf_aquis
    }

    get vl_bc_icms_st_prod_nf_aquis(): number | undefined {
        return this._vl_bc_icms_st_prod_nf_aquis
    }

    set vl_bc_icms_st_prod_nf_aquis(value: number | undefined) {
        this._vl_bc_icms_st_prod_nf_aquis = value
    }
    set vl_bc_icms_op_prop_prod_nf_aquis(value: number | undefined) {
        this._vl_bc_icms_op_prop_prod_nf_aquis = value
    }

   /* get vl_unit_prod_nf_aquis(): string | undefined {
        return this._vl_unit_prod_nf_aquis
    }

    set vl_unit_prod_nf_aquis(value: string | undefined) {
        this._vl_unit_prod_nf_aquis = value
    }*/



    get vl_icms_op_prop_prod_nf_aquis(): number | undefined {
        return this._vl_icms_op_prop_prod_nf_aquis
    }

    set vl_icms_op_prop_prod_nf_aquis(value: number | undefined) {
        this._vl_icms_op_prop_prod_nf_aquis = value
    }



    get vl_pauta_icms_st_prod(): number | undefined {
        return this._vl_pauta_icms_st_prod
    }

    set vl_pauta_icms_st_prod(value: number | undefined) {
        this._vl_pauta_icms_st_prod = value
    }

    get vl_icms_st_item_nf_aquis(): number | undefined {
        return this._vl_icms_st_item_nf_aquis
    }

    set vl_icms_st_item_nf_aquis(value: number | undefined) {
        this._vl_icms_st_item_nf_aquis = value
    }


    get vl_alq_icms_st_prod_oper_saida(): string | undefined {
        return this._vl_alq_icms_st_prod_oper_saida
    }

    set vl_alq_icms_st_prod_oper_saida(value: string | undefined) {
        this._vl_alq_icms_st_prod_oper_saida = value
    }

    get vl_unit_prod_nf_saida(): number | undefined {
        return this._vl_unit_prod_nf_saida
    }

    set vl_unit_prod_nf_saida(value: number | undefined) {
        this._vl_unit_prod_nf_saida = value
    }

    get vl_desc_prod_nf_saida(): string | undefined {
        return this._vl_desc_prod_nf_saida
    }

    set vl_desc_prod_nf_saida(value: string | undefined) {
        this._vl_desc_prod_nf_saida = value
    }

    get vl_venda_unitario_presumido(): number | undefined {
        return this._vl_venda_unitario_presumido
    }

    set vl_venda_unitario_presumido(value: number | undefined) {
        this._vl_venda_unitario_presumido = value
    }

    get vl_venda_unitario_presumido_x_qtd_saida(): number | undefined {
        return this._vl_venda_unitario_presumido_x_qtd_saida
    }

    set vl_venda_unitario_presumido_x_qtd_saida(value: number | undefined) {
        this._vl_venda_unitario_presumido_x_qtd_saida = value
    }

    get vl_bc_icms_st_prod_nf_saida(): number | undefined {
        return this._vl_bc_icms_st_prod_nf_saida
    }

    set vl_bc_icms_st_prod_nf_saida(value: number | undefined) {
        this._vl_bc_icms_st_prod_nf_saida = value
    }


    get vl_ressar_icms_st_prod(): number | undefined {
        return this._vl_ressar_icms_st_prod
    }

    set vl_ressar_icms_st_prod(value: number | undefined) {
        this._vl_ressar_icms_st_prod = value
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
        if (json.cod_produto !== undefined) {
            this.cod_produto = json.cod_produto
        }
        if (json.chassi_veiculo !== undefined) {
            this.chassi_veiculo = json.chassi_veiculo
        }
        if (json.descricao_completa_item !== undefined) {
            this.descricao_completa_item = json.descricao_completa_item
        }
        if (json.ncm_produto !== undefined) {
            this.ncm_produto = json.ncm_produto
        }
        if (json.gtin_ean !== undefined) {
            this.gtin_ean = json.gtin_ean
        }
        if (json.num_item_nf_aquis !== undefined) {
            this.num_item_nf_aquis = json.num_item_nf_aquis
        }
        if (json.aliquota_entrada !== undefined) {
            this.aliquota_entrada = json.aliquota_entrada
        }
        if (json.dta_emiss_nf_aquis !== undefined) {
            this.dta_emiss_nf_aquis = json.dta_emiss_nf_aquis
        }
        if (json.num_nf_aquis !== undefined) {
            this.num_nf_aquis = json.num_nf_aquis
        }
        if (json.num_chv_nf_aquis !== undefined) {
            this.num_chv_nf_aquis = json.num_chv_nf_aquis
        }
        if (json.serie_entrada !== undefined) {
            this.serie_entrada = json.serie_entrada
        }
        if (json.quantidade_entrada !== undefined) {
            this.quantidade_entrada = json.quantidade_entrada
        }
        if (json.vl_unit_prod_nf_aquis !== undefined) {
            this.vl_unit_prod_nf_aquis = json.vl_unit_prod_nf_aquis
        }
        if (json.vl_bc_icms_op_prop_prod_nf_aquis !== undefined) {
            this.vl_bc_icms_op_prop_prod_nf_aquis = json.vl_bc_icms_op_prop_prod_nf_aquis
        }
        if (json.vl_icms_op_prop_prod_nf_aquis !== undefined) {
            this.vl_icms_op_prop_prod_nf_aquis = json.vl_icms_op_prop_prod_nf_aquis
        }
        if (json.tipo_bc_icms_st_prod_nf_aquis !== undefined) {
            this.tipo_bc_icms_st_prod_nf_aquis = json.tipo_bc_icms_st_prod_nf_aquis
        }
        if (json.vl_pauta_icms_st_prod !== undefined) {
            this.vl_pauta_icms_st_prod = json.vl_pauta_icms_st_prod
        }
        if (json.perc_mva_prod !== undefined) {
            this.perc_mva_prod = json.perc_mva_prod
        }
        if (json.vl_bc_icms_st_prod_nf_aquis !== undefined) {
            this.vl_bc_icms_st_prod_nf_aquis = json.vl_bc_icms_st_prod_nf_aquis
        }
        if (json.vl_icms_st_item_nf_aquis !== undefined) {
            this.vl_icms_st_item_nf_aquis = json.vl_icms_st_item_nf_aquis
        }
        if (json.num_nf_saida !== undefined) {
            this.num_nf_saida = json.num_nf_saida
        }
        if (json.num_chv_saida !== undefined) {
            this.num_chv_saida = json.num_chv_saida
        }
        if (json.dta_emiss_nf_saida !== undefined) {
            this.dta_emiss_nf_saida = json.dta_emiss_nf_saida
        }
        if (json.vl_alq_icms_st_prod_oper_saida !== undefined) {
            this.vl_alq_icms_st_prod_oper_saida = json.vl_alq_icms_st_prod_oper_saida
        }
        if (json.quantidade_saida !== undefined) {
            this.quantidade_saida = json.quantidade_saida
        }
        if (json.num_item_nf_saida !== undefined) {
            this.num_item_nf_saida = json.num_item_nf_saida
        }
        if (json.descricao_item_produto !== undefined) {
            this.descricao_item_produto = json.descricao_item_produto
        }
        if (json.vl_unit_prod_nf_saida !== undefined) {
            this.vl_unit_prod_nf_saida = json.vl_unit_prod_nf_saida
        }
        if (json.vl_desc_prod_nf_saida !== undefined) {
            this.vl_desc_prod_nf_saida = json.vl_desc_prod_nf_saida
        }
        if (json.vl_venda_unitario_presumido !== undefined) {
            this.vl_venda_unitario_presumido = json.vl_venda_unitario_presumido
        }
        if (json.vl_venda_unitario_presumido_x_qtd_saida !== undefined) {
            this.vl_venda_unitario_presumido_x_qtd_saida = json.vl_venda_unitario_presumido_x_qtd_saida
        }
        if (json.vl_bc_icms_st_prod_nf_saida !== undefined) {
            this.vl_bc_icms_st_prod_nf_saida = json.vl_bc_icms_st_prod_nf_saida
        }
        if (json.quantidade_saldo !== undefined) {
            this.quantidade_saldo = json.quantidade_saldo
        }
        if (json.saldo_st_unitario !== undefined) {
            this.saldo_st_unitario = json.saldo_st_unitario
        }
        if (json.saldo_st_total !== undefined) {
            this.saldo_st_total = json.saldo_st_total
        }
        if (json.vl_ressar_icms_st_prod !== undefined) {
            this.vl_ressar_icms_st_prod = json.vl_ressar_icms_st_prod
        }
        if (json.outras_operacoes_que_nao_geram_ressarcimento !== undefined) {
            this.outras_operacoes_que_nao_geram_ressarcimento = json.outras_operacoes_que_nao_geram_ressarcimento
        }

        return this
    }

    public toJSON(): any {
        return {
            cd_uf_nf_aquis: this.cd_uf_nf_aquis || undefined,
            cod_produto: this.cod_produto || undefined,
            descricao_completa_item: this.descricao_completa_item || undefined,
            ncm_produto: this.ncm_produto || undefined,
            gtin_ean: this.gtin_ean || undefined,
            num_item_nf_aquis: this.num_item_nf_aquis || undefined,
            aliquota_entrada: this.aliquota_entrada || undefined,
            dta_emiss_nf_aquis: this.dta_emiss_nf_aquis || undefined,
            num_nf_aquis: this.num_nf_aquis || undefined,
            num_chv_nf_aquis: this.num_chv_nf_aquis || undefined,
            serie_entrada: this.serie_entrada || undefined,
            quantidade_entrada: this.quantidade_entrada || undefined,
            vl_unit_prod_nf_aquis: this.vl_unit_prod_nf_aquis || undefined,
            vl_bc_icms_op_prop_prod_nf_aquis: this.vl_bc_icms_op_prop_prod_nf_aquis || undefined,
            vl_icms_op_prop_prod_nf_aquis: this.vl_icms_op_prop_prod_nf_aquis || undefined,
            tipo_bc_icms_st_prod_nf_aquis: this.tipo_bc_icms_st_prod_nf_aquis || undefined,
            vl_pauta_icms_st_prod: this.vl_pauta_icms_st_prod || undefined,
            perc_mva_prod: this.perc_mva_prod || undefined,
            vl_bc_icms_st_prod_nf_aquis: this.vl_bc_icms_st_prod_nf_aquis || undefined,
            vl_icms_st_item_nf_aquis: this.vl_icms_st_item_nf_aquis || undefined,
            num_nf_saida: this.num_nf_saida || undefined,
            num_chv_saida: this.num_chv_saida || undefined,
            dta_emiss_nf_saida: this.dta_emiss_nf_saida || undefined,
            vl_alq_icms_st_prod_oper_saida: this.vl_alq_icms_st_prod_oper_saida || undefined,
            quantidade_saida: this.quantidade_saida || undefined,
            num_item_nf_saida: this.num_item_nf_saida || undefined,
            descricao_item_produto: this.descricao_item_produto || undefined,
            vl_unit_prod_nf_saida: this.vl_unit_prod_nf_saida || undefined,
            vl_desc_prod_nf_saida: this.vl_desc_prod_nf_saida || undefined,
            vl_venda_unitario_presumido: this.vl_venda_unitario_presumido || undefined,
            vl_venda_unitario_presumido_x_qtd_saida: this.vl_venda_unitario_presumido_x_qtd_saida || undefined,
            vl_bc_icms_st_prod_nf_saida: this.vl_bc_icms_st_prod_nf_saida || undefined,
            quantidade_saldo: this.quantidade_saldo || undefined,
            saldo_st_unitario: this.saldo_st_unitario || undefined,
            saldo_st_total: this.saldo_st_total || undefined,
            vl_ressar_icms_st_prod: this.vl_ressar_icms_st_prod || undefined,
            outras_operacoes_que_nao_geram_ressarcimento: this.outras_operacoes_que_nao_geram_ressarcimento || undefined,
        }
    }

    public exportHeaders(): any {
        return [
            'cd_uf_nf_aquis',
            'cod_produto',
            'chass_veiculo',
            'descricao_completa_item',
            'ncm_produto',
            'gtin_ean',
            'num_item_nf_aquis',
            'aliquota_entrada',
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
            'pmpv',
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

    public invalidate(json: any): boolean {
        if (json.cd_uf_nf_aquis === undefined) {
            return true
        }
        if (json.cod_produto === undefined) {
            return true
        }
        if (json.descricao_completa_item === undefined) {
            return true
        }
        if (json.ncm_produto === undefined) {
            return true
        }
        if (json.gtin_ean === undefined) {
            return true
        }
        if (json.num_item_nf_aquis === undefined) {
            return true
        }
        if (json.aliquota_entrada === undefined) {
            return true
        }
        if (json.dta_emiss_nf_aquis === undefined) {
            return true
        }
        if (json.num_nf_aquis === undefined) {
            return true
        }
        if (json.num_chv_nf_aquis === undefined) {
            return true
        }
        if (json.serie_entrada === undefined) {
            return true
        }
        if (json.quantidade_entrada === undefined) {
            return true
        }
        if (json.vl_unit_prod_nf_aquis === undefined) {
            return true
        }
        if (json.vl_bc_icms_op_prop_prod_nf_aquis === undefined) {
            return true
        }
        if (json.vl_icms_op_prop_prod_nf_aquis === undefined) {
            return true
        }
        if (json.tipo_bc_icms_st_prod_nf_aquis === undefined) {
            return true
        }
        if (json.vl_pauta_icms_st_prod === undefined) {
            return true
        }
        if (json.perc_mva_prod === undefined) {
            return true
        }
        if (json.vl_bc_icms_st_prod_nf_aquis === undefined) {
            return true
        }
        if (json.vl_icms_st_item_nf_aquis === undefined) {
            return true
        }
        if (json.num_nf_saida === undefined) {
            return true
        }
        if (json.num_chv_saida === undefined) {
            return true
        }
        if (json.dta_emiss_nf_saida === undefined) {
            return true
        }
        if (json.vl_alq_icms_st_prod_oper_saida === undefined) {
            return true
        }
        if (json.quantidade_saida === undefined) {
            return true
        }
        if (json.num_item_nf_saida === undefined) {
            return true
        }
        if (json.descricao_item_produto === undefined) {
            return true
        }
        if (json.vl_unit_prod_nf_saida === undefined) {
            return true
        }
        if (json.vl_desc_prod_nf_saida === undefined) {
            return true
        }
        if (json.vl_venda_unitario_presumido === undefined) {
            return true
        }
        if (json.vl_venda_unitario_presumido_x_qtd_saida === undefined) {
            return true
        }
        if (json.vl_bc_icms_st_prod_nf_saida === undefined) {
            return true
        }
        if (json.quantidade_saldo === undefined) {
            return true
        }
        if (json.saldo_st_unitario === undefined) {
            return true
        }
        if (json.saldo_st_total === undefined) {
            return true
        }
        if (json.vl_ressar_icms_st_prod === undefined) {
            return true
        }
        if (json.outras_operacoes_que_nao_geram_ressarcimento === undefined) {
            return true
        }
        return false
    }

    public calculation_invalidation(json: any): boolean {
        //  console.log(json)

        if (json.vl_venda_unitario_presumido_x_qtd_saida !==
            Number((json.vl_venda_unitario_presumido || 0) * (json.quantidade_saida || 0).toFixed(2))) {
            console.log("vl_venda_unitario_presumido_x_qtd_saida",
                json.vl_venda_unitario_presumido_x_qtd_saida,
                json.vl_venda_unitario_presumido || 0,
                json.quantidade_saida || 0)
            return true
        }
        if (json.saldo_st_unitario !==
            Number(((json.saldo_st_total || 0) / (json.quantidade_saldo || 1)).toFixed(2))) {
            console.log("saldo_st_unitario diferente",
                json.saldo_st_unitario, Number(((json.saldo_st_total || 0) / (json.quantidade_saldo || 1)).toFixed(2)),
                json.saldo_st_total || 0, json.quantidade_saldo || 1)
            return true
        }

        /*if (json.vl_ressar_icms_st_prod !==
            Number(((json.vl_venda_unitario_presumido_x_qtd_saida || 0) - (json.vl_bc_icms_st_prod_nf_saida || 0).toFixed(2)))
            * (json.vl_alq_icms_st_prod_oper_saida || 0)) {
            console.log("vl_ressar_icms_st_prod diferente",
                json.vl_ressar_icms_st_prod,
                Number(((json.vl_venda_unitario_presumido_x_qtd_saida || 0) - (json.vl_bc_icms_st_prod_nf_saida || 0).toFixed(2))) 
                * (json.vl_alq_icms_st_prod_oper_saida || 0),
                (json.vl_venda_unitario_presumido_x_qtd_saida ?|| 0),
                (json.vl_bc_icms_st_prod_nf_saida || 0)
            )
            return true
        }
        if (json.outras_operacoes_que_nao_geram_ressarcimento !==
            Number(((json.vl_venda_unitario_presumido_x_qtd_saida || 0) - (json.vl_bc_icms_st_prod_nf_saida || 0))
                * (json.vl_alq_icms_st_prod_oper_saida? || 0).toFixed(2))) {
            console.log("outras_operacoes_que_nao_geram_ressarcimento diferente")
            return true
        }*/
        return false
    }
}