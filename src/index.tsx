import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import {App} from './App'
import {store} from './store'
import {Action, AnyAction} from 'redux'
import {undo, redo, historyUpdate, addStateUndo} from './script/slide/actionCreators'
import {Editor, UndoRedo} from './script/slide/slide'

const mapDispatchToProps = (dispatch: (arg0: Action) => AnyAction) => ({
    addStateUndo: (obj: UndoRedo) => dispatch(addStateUndo(obj)),
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
    const state: Editor = store.getState()
    const newHistory: UndoRedo = {
        presentation: state.presentation,
        activeElem: state.active,
        color: state.color
    }
    // console.log('state.history.undo.length = ', state.history.undo)
    // TODO: подписаться на нажатие клавиш функциями внутри index ctrl^s
    // поправить условие в subscribe изменения в презентации и в полях color и active
    // сравнивать с present состоянием
    if (state.history.undo.length === 1) {
        store.dispatch(addStateUndo(newHistory))
    }
    console.log('newHistoryUndoIndex = ', newHistory)
})

export default connect(null, mapDispatchToProps)