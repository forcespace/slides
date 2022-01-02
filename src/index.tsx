import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {App} from './App'
import {createStore, Store} from 'redux'
import {rootReducer} from './script/slide/root-reducer'
import {editor} from './script/slide/editor-new'
import {Editor} from './script/slide/slide'

const store: Store<Editor> = createStore(rootReducer)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)