import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { ANIMATION, TABLES } from '../../material.theme'
import { IApplicationState } from '../../store'
import { Archive } from '../../store/application/models/archive/archive'
import { IPaginator, ISearch } from '../../store/ducks/root.types'
import * as ArchiveActions from '../../store/ducks/archive/actions'
import ArchiveTable from '../../components/archives/archive.table'
import { ArchiveInvalidate } from '../../store/application/models/archive/archive.invalidate'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme)
})

interface IProps extends WithTranslation {
    readonly archives: Archive[]
    readonly invalidate: ArchiveInvalidate[]
    readonly dialog: boolean
    readonly loading: boolean
    readonly paginator: IPaginator
}

interface IDispatch extends RouteComponentProps<any> {
    resetList(): void

    changePaginator(paginator?: IPaginator): void

    changeSearchPaginator(search: ISearch): void

    loadRequest(paginator?: IPaginator): void

    changeArchiveList(data: Archive[]): void

    changeInvalidateList(data: ArchiveInvalidate[]): void

    changeInvalidDialog(dialog: boolean): void
}

type IJoinProps = IProps & IDispatch & WithStyles<typeof Style>

class ArchivesListComponent extends Component<IJoinProps> {

    /**
     * Invoked immediately before a component is disassembled and destroyed.
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentwillunmount}
     * @public
     * @returns {void}
     */
     public componentWillUnmount(): void {
        this.props.resetList()
    }

    /**
     * It is invoked immediately after a component is assembled (inserted into the tree).
     * @public
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @returns {void}
     */
     public componentDidMount() {
        // const { loadRequest, paginator } = this.props
        // loadRequest(paginator)
    }

    public render() {

        const {
            t,
            archives,
            invalidate,
            dialog,
            loading,
            paginator,
            changePaginator,
            changeSearchPaginator,
            changeArchiveList,
            changeInvalidateList,
            changeInvalidDialog,
            resetList
        } = this.props

        return <React.Fragment>
            <Helmet>
                <title>[SR] - {t('ARCHIVES.TITLE')}</title>
            </Helmet>

            <ArchiveTable
                archives={archives}
                invalidate={invalidate}
                dialog={dialog}
                loading={loading}
                paginator={paginator}
                changePaginator={changePaginator}
                changeSearchPaginator={changeSearchPaginator}
                changeArchiveList={changeArchiveList}
                changeInvalidateList={changeInvalidateList}
                changeInvalidDialog={changeInvalidDialog}
                resetList={resetList}/>
                
        </React.Fragment>
    }
}

const ArchivesListWithTranslation = withTranslation()(ArchivesListComponent)

const ArchivesListWithStyles = withStyles<any>(Style)(ArchivesListWithTranslation)

const mapStateToProps = (state: IApplicationState) => ({
    archives: state.archive.list.data,
    invalidate: state.archive.invalidate.data,
    dialog: state.archive.invalidate.dialog,
    loading: state.archive.list.loading,
    paginator: state.archive.list.paginator,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(ArchiveActions, dispatch)

const ArchivesList = withRouter(connect(mapStateToProps, mapDispatchToProps)(ArchivesListWithStyles))

export default ArchivesList

