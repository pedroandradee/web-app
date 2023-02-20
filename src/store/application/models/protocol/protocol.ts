import { JsonUtils } from '../../utils/json.util'

export class Protocol {
    private _protocol: number | undefined
    private _name: string | undefined
    private _issue_date: string | undefined
    private _status_av: string | undefined

    get protocol(): number | undefined {
        return this._protocol
    }
    set protocol(value: number | undefined) {
        this._protocol = value
    }
    get name(): string | undefined {
        return this._name
    }
    set name(value: string | undefined) {
        this._name = value
    }
    get issue_date(): string | undefined {
        return this._issue_date
    }
    set issue_date(value: string | undefined) {
        this._issue_date = value
    }
    get status_av(): string | undefined {
        return this._status_av
    }
    set status_av(value: string | undefined) {
        this._status_av = value
    }

    public fromJSON(json: any): Protocol {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }
        if (json.protocol !== undefined) {
            this.protocol = json.protocol
        }
        if (json.name !== undefined) {
            this.name = json.name
        }
        if (json.issue_date !== undefined) {
            this.issue_date = json.issue_date
        }
        if (json.status_av !== undefined) {
            this.status_av = json.status_av
        }

        return this
    }

    public toJSON(): any {
        return {
            protocol: this.protocol || undefined,
            name: this.name || undefined,
            issue_date: this.issue_date || undefined,
            status_av: this.status_av || undefined
        }
    }
}