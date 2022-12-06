import { Archive } from './archive'
/**
 * Archive item invalidate
 * @category Models
 * @subcategory archive
 * @property {number} [table_index] the index of the table that has problem
 */
export class ArchiveInvalidate extends Archive {
    private _table_index: number | undefined

    get table_index(): number | undefined {
        return this._table_index
    }

    set table_index(value: number | undefined) {
        this._table_index = value
    }

    public fromJSON(json: any): ArchiveInvalidate {

        super.fromJSON(json)

        if (json.table_index !== undefined) {
            this.table_index = json.table_index
        }

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            table_index: this.table_index || undefined
        }
    }

    
}