import React, { Component, lazy } from 'react'

import { 
    Box,
    createStyles,
    Paper,
    Theme,
    withStyles,
    WithStyles
} from '@material-ui/core'


import { withTranslation, WithTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { ANIMATION } from '../../material.theme'
import { IApplicationState } from '../../store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import clsx from 'clsx'

import * as NfeActions from '../../store/ducks/nfe/actions'
import * as ProtocolActions from '../../store/ducks/protocol/actions'
import { IPaginator, ISearch } from '../../store/ducks/root.types'
import { Protocol } from '../../store/application/models/protocol/protocol'
import { NfeItem } from '../../store/application/models/protocol/nfe.item'
import FullHeaderProtocol from '../../components/protocol/full.header'

const NfeTable = lazy(() => import('../../components/table/nfe/nfe.table'))

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    paper: {
        width: '100%',
        padding: `${theme.spacing(1)}px 0px`
    }
})

interface IProps extends WithTranslation {
    readonly protocol: Protocol
    readonly loading: boolean

    readonly nfeList: NfeItem[]
    readonly nfeLoading: boolean
    readonly paginator: IPaginator
}

interface IDispatch extends RouteComponentProps<any> {
    resetList(): void

    findRequest(protocol: string): void

    loadRequest(protocol: string, paginator?: IPaginator): void

    changePaginator(protocol: string, paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void
}

type IJoinProps = IProps & IDispatch & WithStyles<typeof Style>

class ProtocolTableComponent extends Component<IJoinProps> {

    /**
     * It is invoked immediately after a component is assembled (inserted into the tree).
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @public
     * @returns {void}
     */
    public componentDidMount(): void {
        const {
            match: { params },
            findRequest
        } = this.props
        findRequest(params.protocol_id)
    }

    /**
     * Invoked immediately before a component is disassembled and destroyed.
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentwillunmount}
     * @public
     * @returns {void}
     */
    public componentWillUnmount(): void {
        this.props.resetList()
    }

    public render() {
        const {
            t,
            classes,
            protocol,
            loading,
            nfeList,
            nfeLoading,
            paginator,
            loadRequest,
            changePaginator,
            changeSearchPaginator
        } = this.props
        
        return <React.Fragment>
            <Helmet>
                <title>{t('NAVIGATION_TAB.PROTOCOL')}</title>
            </Helmet>

            <Paper className={clsx(classes.paper, classes.fadeIn2)}>

                <FullHeaderProtocol
                    protocol={protocol}
                    loading={loading}
                    nfeItemLoading={nfeLoading}/>
            
                <Box p={1}>
                    <NfeTable
                        protocol={`${protocol?.protocol || ''}`}
                        list={nfeList}
                        loading={nfeLoading}
                        paginator={paginator}
                        loadRequest={loadRequest}
                        changePaginator={changePaginator}
                        changeSearchPaginator={changeSearchPaginator}/>
                </Box>
            </Paper>
        </React.Fragment>
    }

    /*private loadProtocol(): void {
        const {
            match: { params }
            // protocol,
            // loadProtocolItems
        } = this.props
      //  console.log(params)
       // console.log("loading protocol items")
    }*/
}

const ProtocolTableWithTranslation = withTranslation()(ProtocolTableComponent)

const ProtocolTable = withStyles<any>(Style)(ProtocolTableWithTranslation)

const mapStateToProps = (state: IApplicationState) => ({
    protocol: state.protocol.protocol.data,
    loading: state.protocol.protocol.loading,

    nfeList: state.nfe.list.data,
    nfeLoading: state.nfe.list.loading,
    paginator: state.nfe.list.paginator
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...NfeActions,
    findRequest: ProtocolActions.findRequest
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtocolTable))
