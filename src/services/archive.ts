import { Archive } from '../store/application/models/archive/archive'
import { IAxiosResponse, IPaginator } from '../store/ducks/root.types'

import axiosInstance from './axios'


class ArchiveService {
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
    public async getArchives(paginator?: IPaginator): Promise<IAxiosResponse<Archive[]>> {
        const params = new URLSearchParams()

        if (paginator) {

            if (paginator.page) {
                params.append('page', String(paginator.page + 1))
            }

            if (paginator.rows) {
                params.append('limit', String(paginator.rows))
            }
        }

        return axiosInstance
            .get(`${this.apiVersion}/archives`, { params })
            .then((response: IAxiosResponse) => {
                return {
                    data: response.data.map((item: any) => new Archive().fromJSON(item)),
                    headers: response.headers
                }
            })
    }
}

export default new ArchiveService()