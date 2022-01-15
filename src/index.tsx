import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import {App} from './App'
import {store} from './store'
import {Action, AnyAction} from 'redux'
import {
    undo,
    redo,
    // historyUpdate,
    addStateUndo,
    updateHistoryPresentAfterUndo,
    updateHistoryPresentAfterRedo,
    setPresentation
} from './script/slide/actionCreators'
import {Editor, UndoRedo} from './script/slide/slide'

const mapDispatchToProps = (dispatch: (arg0: Action) => AnyAction) => ({
    addStateUndo: (obj: UndoRedo) => dispatch(addStateUndo(obj)),
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo())
    // historyUpdate: () => dispatch(historyUpdate())
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
    let state: Editor = store.getState()
    const newHistory: UndoRedo = {
        presentation: state,
        active: state.active,
        color: state.color
    }
    console.log(state.history.test)
    if ((state !== state.history.present.presentation) && (state.history.flag !== 'redo') && (state.history.flag !== 'undo') &&
        state.history.undo.length < 10) {
        store.dispatch(addStateUndo(newHistory))
        state = store.getState()
    }
})

document.addEventListener('keydown', function (zEvent) {
    let state = store.getState()
    if ((zEvent.ctrlKey && zEvent.key === 'z') || (zEvent.ctrlKey && zEvent.key === 'Z') && state.history.undo.length > 0) {
        store.dispatch(undo())
        console.log(store.getState().history.flag)
        state = store.getState()
        store.dispatch(setPresentation(state.history.undo[state.history.undo.length - 1].presentation))
        store.dispatch(updateHistoryPresentAfterUndo())
    }

    if ((zEvent.ctrlKey && zEvent.key === 'y') || (zEvent.ctrlKey && zEvent.key === 'Y') && state.history.redo.length > 0) {
        store.dispatch(redo())
        console.log(store.getState().history.flag)
        state = store.getState()
        store.dispatch(setPresentation(state.history.redo[0].presentation))
        store.dispatch(updateHistoryPresentAfterRedo())
    }
})

export default connect(null, mapDispatchToProps)