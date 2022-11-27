import { JsonUtils } from "../../utils/json.util"


export class Archive {
    private _id: string | undefined

    get id(): string | undefined {
        return this._id
    }

    set id(value: string | undefined) {
        this._id = value
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

        if (json.id !== undefined) {
            this.id = json.id
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id || undefined
        }
    }
}