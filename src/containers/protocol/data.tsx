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
// const TableProtocol = lazy(() => import('../../components/table/protocol.table/protocol.table'))

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    paper: {
        width: '100%',
        padding: `${theme.spacing(1)}px 0px`
    }
})

interface IProps extends WithTranslation {

}

interface IDispatch extends RouteComponentProps<any> {

}

type IJoinProps = IProps & IDispatch & WithStyles<typeof Style>

class ProtocolTableComponent extends Component<IJoinProps> {

    constructor(props: IJoinProps) {
        super(props)

        /* Bind Context */
        this.loadProtocol = this.loadProtocol.bind(this)
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

        this.loadProtocol()
    }

    public render() {
        const {
            t,
            classes
        } = this.props

        return <React.Fragment>
            <Helmet>
                <title>{t('NAVIGATION_TAB.PROTOCOL')}</title>
            </Helmet>

            <Paper className={clsx(classes.paper, classes.fadeIn2)}>
                {/*
                <FullHeaderProtocol
                    />
                */}
                <Box pt={1}>
                    {/*<TableProtocol
                        />*/}
                </Box>
            </Paper>
        </React.Fragment>
    }

    private loadProtocol(): void {
        const {
            match: { params }
            // protocol,
            // loadProtocolItems
        } = this.props
        console.log("loading protocol items")
    }
}

const ProtocolTableWithTranslation = withTranslation()(ProtocolTableComponent)

const ProtocolTable = withStyles<any>(Style)(ProtocolTableWithTranslation)

const mapStateToProps = (state: IApplicationState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({

}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtocolTable))