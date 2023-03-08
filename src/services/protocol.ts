import { Protocol } from '../store/application/models/protocol/protocol'
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

    public async getByProtocol(protocol: string): Promise<Protocol> {
        return new Promise<Protocol>(async resolve => {
            await this.delay(1000)
            resolve(
                {
                    ...MOCKS
                    .filter((item: Protocol) => item?.protocol === parseInt(protocol || '0',10))[0]
                    ?.toJSON() || new Protocol().toJSON()
                }
            )
        })
    }

    private delay(milliseconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}

export default new ProtocolService()