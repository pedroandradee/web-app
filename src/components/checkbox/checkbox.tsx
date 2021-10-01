import React from 'react'
import { VerifyScopes } from '../verify.scopes'
import { Checkbox, Tooltip } from '@material-ui/core'

const ListCheck = (props: {
    id: string,
    className: string,
    resourceId: string | undefined,
    add: any,
    remove: any,
    checked: boolean,
    scopes: string [],
    tooltip?: string
}) => {
    const {
        id,
        className,
        resourceId,
        add,
        remove,
        checked,
        scopes,
        tooltip
    } = props
    return <React.Fragment>
        <VerifyScopes scopes={scopes}>
            <Tooltip title={tooltip || ''}>
                <Checkbox
                    id={id}
                    className={className}
                    color="primary"
                    size="small"
                    checked={checked}
                    onChange={(e: any) => {
                        e?.target?.checked ? add(resourceId) : remove(resourceId)
                    }}/>
            </Tooltip>
        </VerifyScopes>
    </React.Fragment>
}

export default ListCheck
