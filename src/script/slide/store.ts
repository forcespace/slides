import {createStore, Store} from 'redux'
import {rootReducer} from './root-reducer'

export const store: Store = createStore(rootReducer)