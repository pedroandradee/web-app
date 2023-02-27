import React, { Component } from 'react'

import { Provider } from 'react-redux'

import ThemeProviderComponent from './theme.provider'
import * as PackageJson from '../package.json'
import { Store } from 'redux'

const VERSION = PackageJson.version
const DESCRIPTION = PackageJson.description

interface IProps {
    readonly store: Store
}

class App extends Component<IProps> {

    public render() {
        const { store } = this.props
        const commonStyle = 'font-weight: bold;font-style: italic;font-style: italic;'
        const style1 = `${commonStyle};font-size: 40px;color: #50668F;`
        const style2 = `${commonStyle};font-size: 12px;5px;color: #555;`
        const style3 = `${commonStyle};font-size: 10px;color: #555;`
        const style4 = `${commonStyle};font-size: 8px;color: #555;`

        console.log(`%cSR%cby NUTES/UEPB\n%c${DESCRIPTION}\n%cv${VERSION}`, style1, style2, style3, style4)

        return <Provider store={store}>
            <ThemeProviderComponent/>
        </Provider>
    }
}

export default App
