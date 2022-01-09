import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import {App} from './App'
import {store} from './store'
import {Action, AnyAction} from 'redux'
import {undo, redo, historyUpdate} from './script/slide/actionCreators'

const mapDispatchToProps = (dispatch: (arg0: Action) => AnyAction) => ({
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo()),
    historyUpdate: () => dispatch(historyUpdate())
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

store.subscribe(() => {
    // console.log('Spider Man. No Way Back')
})

export default connect(null, mapDispatchToProps)