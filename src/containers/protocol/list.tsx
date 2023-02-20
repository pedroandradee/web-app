import React, { Component, lazy } from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import { ANIMATION } from '../../material.theme'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Protocol } from '../../store/application/models/protocol/protocol'
import { IPaginator, ISearch } from '../../store/ducks/root.types'
import { Helmet } from 'react-helmet'
import { IApplicationState } from '../../store'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as ProtocolActions from '../../store/ducks/protocol/actions'

const TableProtocols = lazy(() => import('../../components/table/protocols/list'))

const Style = () => createStyles({
    ...ANIMATION
})

interface IProps extends WithTranslation {
    readonly protocols: Protocol[]
    readonly loading: boolean
    readonly paginator: IPaginator
}

interface IDispatch {
    loadRequest(paginator?: IPaginator): void
    
    changePaginator(paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void

    resetList(): void
}

type IJoinProps = IProps & IDispatch & WithStyles<typeof Style>

class ListProtocolsComponent extends Component<IJoinProps> {

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
            protocols,
            loading,
            paginator,
            loadRequest,
            changePaginator,
            changeSearchPaginator
        } = this.props

        return <React.Fragment>
            <Helmet>
                <title>[SR] - {t('PROTOCOLS.TITLE')}</title>
            </Helmet>

            <TableProtocols
                protocols={protocols}
                loading={loading}
                paginator={paginator}
                loadRequest={loadRequest}
                changePaginator={changePaginator}
                changeSearchPaginator={changeSearchPaginator}/>
        </React.Fragment>
    }
}

const ListProtocolsWithTranslation = withTranslation()(ListProtocolsComponent)

const ListProtocolsWithStyles = withStyles<any>(Style)(ListProtocolsWithTranslation)

const mapStateToProps = (state: IApplicationState) => ({
    protocols: state.protocol.list.data,
    loading: state.protocol.list.loading,
    paginator: state.protocol.list.paginator
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...ProtocolActions
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListProtocolsWithStyles)