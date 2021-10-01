import React from 'react'

import ReactDOM from 'react-dom'
import './i18n'
import 'fontsource-roboto'
import './index.scss'

import App from './app'
import reportWebVitals from './report.web.vitals'
import * as serviceWorker from './service.worker.registration'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
