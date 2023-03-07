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

import * as ProtocolActions from '../../store/ducks/protocol/actions'
import InfoProtocols from '../../components/protocol.information/protocol.information'
import { IPaginator, ISearch } from '../../store/ducks/root.types'
import { ProtocolItem } from '../../store/application/models/protocol/protocol.item'
import { Protocol } from '../../store/application/models/protocol/protocol'

const GeneralConsultation= lazy(() => import('../../components/table/general.consultation/list'))

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    paper: {
        width: '100%',
        padding: `${theme.spacing(1)}px 0px`
    }
})

interface IProps extends WithTranslation {
    readonly protocolItem: ProtocolItem[]
    readonly loading: boolean
    readonly paginator: IPaginator
    readonly protocols:Protocol[]
}

interface IDispatch extends RouteComponentProps<any> {
    loadRequest(paginator?: IPaginator): void

    changePaginator(paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void
}

type IJoinProps = IProps & IDispatch & WithStyles<typeof Style>

class ProtocolTableComponent extends Component<IJoinProps> {

    constructor(props: IJoinProps) {
        super(props)

        /* Bind Context */
        //this.loadProtocol = this.loadProtocol.bind(this)
    }

    public componentDidMount(): void {
        const {
            match: { params },
            // protocol,
            // findRequest
        } = this.props
        // const protocolId: string = params?.id
        // if (protocol?.id !== protocolId) {
        //     findRequest(protocolId)
        // }

       // this.loadProtocol()
    }

    public render() {
        const {
            t,
            classes,
            protocolItem,
            loading,
            paginator,
            protocols,
            loadRequest,
            changePaginator,
            changeSearchPaginator
        } = this.props
        console.log(protocols)
        console.log(protocolItem)
        return <React.Fragment>
            <Helmet>
                <title>{t('NAVIGATION_TAB.PROTOCOL')}</title>
            </Helmet>

            <Paper className={clsx(classes.paper, classes.fadeIn2)}>
            
         

                 <InfoProtocols
                  //protocol={}  
                 loading={loading}
                 />
            

                <Box pt={1}>
                    <GeneralConsultation
                     protocolItem={protocolItem}
                     loading={loading}
                     paginator={paginator}  
                    // loadRequest={loadRequest}
                     changePaginator={changePaginator}
                     changeSearchPaginator={changeSearchPaginator} />
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
    protocols:state.protocol.list.data,
    protocolItem: state.protocol.protocolItemsList.data,
    loading: state.protocol.protocolItemsList.loading,
    paginator: state.protocol.protocolItemsList.paginator
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    changePaginator: ProtocolActions.changePaginator,
    changeSearchPaginator: ProtocolActions.changeSearchPaginator

}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtocolTable))
