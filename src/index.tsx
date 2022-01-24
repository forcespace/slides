import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import {App} from './App'
import {store} from './script/slide/store'
import {undo, redo, ExtendedAction} from './script/slide/actionCreators'

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction) => ({
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo())
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

document.addEventListener('keydown', zEvent => {
    if ((zEvent.ctrlKey && zEvent.key === 'z') || (zEvent.ctrlKey && zEvent.key === 'Z')) {
        store.dispatch(undo())
    }

    if ((zEvent.ctrlKey && zEvent.key === 'y') || (zEvent.ctrlKey && zEvent.key === 'Y')) {
        store.dispatch(redo())
    }
})

export default connect(null, mapDispatchToProps)