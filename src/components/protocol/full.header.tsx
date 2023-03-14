import React, { Component } from 'react'
import {
    Box,
    createStyles,
    withStyles,
    WithStyles,

} from '@material-ui/core'
import { ANIMATION } from '../../material.theme'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Protocol } from '../../store/application/models/protocol/protocol'
import ProtocolHeader from './header'

const Style = () => createStyles({
    ...ANIMATION
})

interface IProps extends WithTranslation {
    readonly protocol: Protocol
    readonly loading: boolean
    readonly nfeItemLoading: boolean
}

type IJoinProps = IProps & WithStyles<typeof Style>

class FullHeaderProtocolComponent extends Component<IJoinProps> {

    public render() {

        const {
            t,
            classes,
            protocol,
            loading,
            nfeItemLoading
        } = this.props

        return <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center">
            <ProtocolHeader
                protocol={protocol}
                loading={loading}/>
            
            <Box p={1}>
                pesquisa ou data
            </Box>
        </Box>

    }
}

const FullHeaderProtocolWithTranslation = withTranslation()(FullHeaderProtocolComponent)

const FullHeaderProtocol = withStyles<any>(Style)(FullHeaderProtocolWithTranslation)

export default FullHeaderProtocol