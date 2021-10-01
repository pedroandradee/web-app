import React, { Component, lazy } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { History } from 'history'
import { WithStyles } from '@material-ui/core'

import protectionLogo from '../../assets/imgs/escape.pages/protection.svg'

const EscapePage = lazy(() => import('./escape.component'))

interface IProperties {
    history: History
}

type Props = IProperties & WithTranslation & WithStyles<any>

class AccessDenied extends Component<Props> {

    public render() {
        const { t } = this.props

        const image = <img
            src={protectionLogo}
            title={t('ESCAPE_PAGE.ACCESS_DENIED.TITLE')}
            alt={t('ESCAPE_PAGE.ACCESS_DENIED.TITLE')}/>

        return <EscapePage
            image={image}
            title={t('ESCAPE_PAGE.ACCESS_DENIED.TITLE')}
            description={t('ESCAPE_PAGE.ACCESS_DENIED.DESCRIPTION')}/>
    }
}

export default withTranslation()(AccessDenied)
