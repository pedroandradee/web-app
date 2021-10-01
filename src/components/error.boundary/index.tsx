import React, { Component, ErrorInfo } from 'react'
import { Typography } from '@material-ui/core'
import { withTranslation, WithTranslation } from 'react-i18next'

interface State {
    readonly error: any
    readonly errorInfo: any
}

class ErrorBoundary extends Component<WithTranslation, State> {

    constructor(props: WithTranslation) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({ error, errorInfo })
        // You can also log error messages to an error reporting service here
        console.error('Error: ', error)
        console.error('ErrorInfo: ', errorInfo)
        // logErrorToMyService(error, errorInfo)
    }

    public render() {
        const { t } = this.props
        const { error, errorInfo } = this.state
        if (error || errorInfo) {
            // Error path
            return (
                <React.Fragment>

                    <Typography variant="h6" noWrap={true}>{t('ERROR.TITLE')}</Typography>

                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error?.toString()}
                        <br />
                        {errorInfo?.componentStack}
                    </details>

                </React.Fragment>
            )
        }
        // Normally, just render children
        return this.props.children
    }
}

export default withTranslation()(ErrorBoundary)
