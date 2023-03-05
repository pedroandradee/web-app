import { Protocol } from '../store/application/models/protocol/protocol'
import { ProtocolItem } from '../store/application/models/protocol/protocol.item'
import { IAxiosResponse, IPaginator } from '../store/ducks/root.types'

import axiosInstance from './axios'

const MOCKS: Protocol[] = [
    { protocol: 1111, name: "Jose da Silva", issue_date: "12/01/2023", status_av: "Deferido" },
    { protocol: 2222, name: "Maria Calvacante", issue_date: "12/01/2023", status_av: "Indeferido" },
    { protocol: 3333, name: "Mateo Alvaro", issue_date: "12/01/2023", status_av: "Pacialmente deferido" },
    { protocol: 4444, name: "Paulo Souza", issue_date: "12/01/2023", status_av: "Pacialmente deferido" },
    { protocol: 5555, name: "Rodrigo Almeida", issue_date: "12/01/2023", status_av: "Indeferido" },
    { protocol: 6666, name: "Juliana Silva", issue_date: "12/01/2023", status_av: "Deferido" },
    { protocol: 7777, name: "Jessica Alves", issue_date: "12/01/2023", status_av: "Pacialmente deferido" },
    { protocol: 8888, name: "Matias Cavalcante", issue_date: "12/01/2023", status_av: "Indeferido" },
    { protocol: 9999, name: "Rafaela Pontes", issue_date: "12/01/2023", status_av: "Deferido" }
].map((item: any) => new Protocol().fromJSON(item))

const MOCKITEM: ProtocolItem[] = [
    {
        cod_produto: 138,
        descricao_completa_item: "FARINHA ROSCA YOKI 5KG",
        ncm_produto:"19019090",
        chassi_veiculo: null,
        cd_uf_nf_aquis: null,
        gtin_ean: 7891095417421,
        num_item_nf_aquis: null,
        aliquota_entrada: 18,
        data_emissao_nf_aquis: null,
        num_nf_aquis: null,
        num_chv_nf_aquis: null,
        quantidade_entrada: 0,
        unidade_entrada: null,
        pmpf: null,
        vl_unit_prod_nf_aquis: null,
        vl_bc_icms_op_prop_prod_nf_aquis: null,
        vl_icms_op_prop_prod_nf_aquis: null,
        tipo_bc_icms_st_prod_nf_aquis: null,
        vl_pauta_icms_st_prod: null,
        perc_mva_prod: null,
        vl_bc_icms_st_prod_nf_aquis: 0,
        vl_icms_st_item_nf_aquis: null,
        num_nf_saida: 30784,
        num_chv_saida: 25170506057223029668650220000307841220601980,
        dta_emiss_nf_saida: "5/2/2017",
        vl_alq_icms_st_prod_oper_saida: 18,
        quantidade_saida: 10,
        num_item_nf_saida: null,
        ncm: null,
        descricao_item_produto: "F ROSCA YOKI 5KG",
        unidade_venda: null,
        vl_unit_prod_nf_saida: 28.9,
        vl_desc_prod_nf_saida: null,
        vl_venda_unitario_presumido: 31.95,
        vl_venda_unitario_presumido_x_qtd_saida: 319.5,
        vl_icms_st_prod_nf_saida: 289,
        quantidade_saldo: 68,
        saldo_st_unitario: 31.95,
        saldo_st_total: 2172.38,
        vl_ressar_icms_st_prod: 5.49,
        outras_operacoes_que_nao_geram_ressarcimento: 0,
        protocol: 1111
    },
    {
        cod_produto: 138,
        descricao_completa_item: "FARINHA ROSCA YOKI 5KG",
        ncm_produto:"19019090",
        chassi_veiculo: null,
        cd_uf_nf_aquis: null,
        gtin_ean: 7891095417421,
        num_item_nf_aquis: null,
        aliquota_entrada: 18,
        data_emissao_nf_aquis: null,
        num_nf_aquis: null,
        num_chv_nf_aquis: null,
        quantidade_entrada: 0,
        unidade_entrada: null,
        pmpf: null,
        vl_unit_prod_nf_aquis: null,
        vl_bc_icms_op_prop_prod_nf_aquis: null,
        vl_icms_op_prop_prod_nf_aquis: null,
        tipo_bc_icms_st_prod_nf_aquis: null,
        vl_pauta_icms_st_prod: null,
        perc_mva_prod: null,
        vl_bc_icms_st_prod_nf_aquis: 0,
        vl_icms_st_item_nf_aquis: null,
        num_nf_saida: 30784,
        num_chv_saida: 25170506057223029668650220000307841220601980,
        dta_emiss_nf_saida: "5/2/2017",
        vl_alq_icms_st_prod_oper_saida: 18,
        quantidade_saida: 10,
        num_item_nf_saida: null,
        ncm: null,
        descricao_item_produto: "F ROSCA YOKI 5KG",
        unidade_venda: null,
        vl_unit_prod_nf_saida: 28.9,
        vl_desc_prod_nf_saida: null,
        vl_venda_unitario_presumido: 31.95,
        vl_venda_unitario_presumido_x_qtd_saida: 319.5,
        vl_icms_st_prod_nf_saida: 289,
        quantidade_saldo: 68,
        saldo_st_unitario: 31.95,
        saldo_st_total: 2172.38,
        vl_ressar_icms_st_prod: 5.49,
        outras_operacoes_que_nao_geram_ressarcimento: 0,
        protocol: 1111
    },
    {
        cod_produto: 138,
        descricao_completa_item: "FARINHA ROSCA YOKI 5KG",
        ncm_produto:"19019090",
        chassi_veiculo: null,
        cd_uf_nf_aquis: null,
        gtin_ean: 7891095417421,
        num_item_nf_aquis: null,
        aliquota_entrada: 18,
        data_emissao_nf_aquis: null,
        num_nf_aquis: null,
        num_chv_nf_aquis: null,
        quantidade_entrada: 0,
        unidade_entrada: null,
        pmpf: null,
        vl_unit_prod_nf_aquis: null,
        vl_bc_icms_op_prop_prod_nf_aquis: null,
        vl_icms_op_prop_prod_nf_aquis: null,
        tipo_bc_icms_st_prod_nf_aquis: null,
        vl_pauta_icms_st_prod: null,
        perc_mva_prod: null,
        vl_bc_icms_st_prod_nf_aquis: 0,
        vl_icms_st_item_nf_aquis: null,
        num_nf_saida: 30784,
        num_chv_saida: 25170506057223029668650220000307841220601980,
        dta_emiss_nf_saida: "5/2/2017",
        vl_alq_icms_st_prod_oper_saida: 18,
        quantidade_saida: 10,
        num_item_nf_saida: null,
        ncm: null,
        descricao_item_produto: "F ROSCA YOKI 5KG",
        unidade_venda: null,
        vl_unit_prod_nf_saida: 28.9,
        vl_desc_prod_nf_saida: null,
        vl_venda_unitario_presumido: 31.95,
        vl_venda_unitario_presumido_x_qtd_saida: 319.5,
        vl_icms_st_prod_nf_saida: 289,
        quantidade_saldo: 68,
        saldo_st_unitario: 31.95,
        saldo_st_total: 2172.38,
        vl_ressar_icms_st_prod: 5.49,
        outras_operacoes_que_nao_geram_ressarcimento: 0,
        protocol: 2222
    },
    {
        cod_produto: 138,
        descricao_completa_item: "FARINHA ROSCA YOKI 5KG",
        ncm_produto:"19019090",
        chassi_veiculo: null,
        cd_uf_nf_aquis: null,
        gtin_ean: 7891095417421,
        num_item_nf_aquis: null,
        aliquota_entrada: 18,
        data_emissao_nf_aquis: null,
        num_nf_aquis: null,
        num_chv_nf_aquis: null,
        quantidade_entrada: 0,
        unidade_entrada: null,
        pmpf: null,
        vl_unit_prod_nf_aquis: null,
        vl_bc_icms_op_prop_prod_nf_aquis: null,
        vl_icms_op_prop_prod_nf_aquis: null,
        tipo_bc_icms_st_prod_nf_aquis: null,
        vl_pauta_icms_st_prod: null,
        perc_mva_prod: null,
        vl_bc_icms_st_prod_nf_aquis: 0,
        vl_icms_st_item_nf_aquis: null,
        num_nf_saida: 30784,
        num_chv_saida: 25170506057223029668650220000307841220601980,
        dta_emiss_nf_saida: "5/2/2017",
        vl_alq_icms_st_prod_oper_saida: 18,
        quantidade_saida: 10,
        num_item_nf_saida: null,
        ncm: null,
        descricao_item_produto: "F ROSCA YOKI 5KG",
        unidade_venda: null,
        vl_unit_prod_nf_saida: 28.9,
        vl_desc_prod_nf_saida: null,
        vl_venda_unitario_presumido: 31.95,
        vl_venda_unitario_presumido_x_qtd_saida: 319.5,
        vl_icms_st_prod_nf_saida: 289,
        quantidade_saldo: 68,
        saldo_st_unitario: 31.95,
        saldo_st_total: 2172.38,
        vl_ressar_icms_st_prod: 5.49,
        outras_operacoes_que_nao_geram_ressarcimento: 0,
        protocol: 3333
    },
    {
        cod_produto: 138,
        descricao_completa_item: "FARINHA ROSCA YOKI 5KG",
        ncm_produto:"19019090",
        chassi_veiculo: null,
        cd_uf_nf_aquis: null,
        gtin_ean: 7891095417421,
        num_item_nf_aquis: null,
        aliquota_entrada: 18,
        data_emissao_nf_aquis: null,
        num_nf_aquis: null,
        num_chv_nf_aquis: null,
        quantidade_entrada: 0,
        unidade_entrada: null,
        pmpf: null,
        vl_unit_prod_nf_aquis: null,
        vl_bc_icms_op_prop_prod_nf_aquis: null,
        vl_icms_op_prop_prod_nf_aquis: null,
        tipo_bc_icms_st_prod_nf_aquis: null,
        vl_pauta_icms_st_prod: null,
        perc_mva_prod: null,
        vl_bc_icms_st_prod_nf_aquis: 0,
        vl_icms_st_item_nf_aquis: null,
        num_nf_saida: 30784,
        num_chv_saida: 25170506057223029668650220000307841220601980,
        dta_emiss_nf_saida: "5/2/2017",
        vl_alq_icms_st_prod_oper_saida: 18,
        quantidade_saida: 10,
        num_item_nf_saida: null,
        ncm: null,
        descricao_item_produto: "F ROSCA YOKI 5KG",
        unidade_venda: null,
        vl_unit_prod_nf_saida: 28.9,
        vl_desc_prod_nf_saida: null,
        vl_venda_unitario_presumido: 31.95,
        vl_venda_unitario_presumido_x_qtd_saida: 319.5,
        vl_icms_st_prod_nf_saida: 289,
        quantidade_saldo: 68,
        saldo_st_unitario: 31.95,
        saldo_st_total: 2172.38,
        vl_ressar_icms_st_prod: 5.49,
        outras_operacoes_que_nao_geram_ressarcimento: 0,
        protocol: 4444
    }
].map((item: any) => new ProtocolItem().fromJSON(item))


class ProtocolService {
    /**
     * @constructor
     * @param {string} apiVersion apiVersion
     */
     constructor(private apiVersion: string = 'v1') {
    }

    /**
     * @public
     * @async
     * @param {IPaginator} [paginator] Variable that controls the page
     * @returns
     */
    public async getProtocols(paginator?: IPaginator): Promise<IAxiosResponse<Protocol[]>> {
        const params = new URLSearchParams()

        if (paginator) {

            if (paginator.page) {
                params.append('page', String(paginator.page + 1))
            }

            if (paginator.rows) {
                params.append('limit', String(paginator.rows))
            }
        }
        return new Promise<IAxiosResponse<Protocol[]>>(async resolve => {
            await this.delay(1000)
            resolve(
                {
                    data: MOCKS,
                    headers: {
                        'x-total-count': MOCKS.length
                    }
                }
            )
        })

        // return axiosInstance
        //     .get(`${this.apiVersion}/protocols`, { params })
        //     .then((response: IAxiosResponse) => {
        //         return {
        //             data: response.data.map((item: any) => new Protocol().fromJSON(item)),
        //             headers: response.headers
        //         }
        //     })
    }

    public async getByProtocol(protocol: string): Promise<IAxiosResponse<Protocol>> {
        return new Promise<IAxiosResponse<Protocol>>(async resolve => {
            await this.delay(1000)
            resolve(
                {
                    data: MOCKS
                    .filter((item: Protocol) => item?.protocol === parseInt(protocol || '0',10))[0]
                    ?.toJSON() || new Protocol(),
                    headers: {}
                }
            )
        })
    }

    public async getProtocolItems(protocol: string, paginator?: IPaginator): Promise<IAxiosResponse<ProtocolItem[]>> {
        const params = new URLSearchParams()

        if (paginator) {
            if (paginator.page) {
                params.append('page', String(paginator.page + 1))
            }

            if (paginator.rows) {
                params.append('limit', String(paginator.rows))
            }
        }

        return new Promise<IAxiosResponse<ProtocolItem[]>>(async resolve => {
            await this.delay(1000)
            resolve ({
                data: MOCKITEM
                    .filter((pi: ProtocolItem) => pi.protocol === parseInt(protocol,10)),
                headers: {
                    'x-total-count': MOCKITEM
                    .filter((pi: ProtocolItem) => pi.protocol === parseInt(protocol,10))
                    .length
                }
            })
        })

    }

    private delay(milliseconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}

export default new ProtocolService()