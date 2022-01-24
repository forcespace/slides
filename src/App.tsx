import './App.css'
import Workspace from './components/Workspace/Workspace'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Nav from './components/Navigation/Nav'
import {connect} from 'react-redux'
// import { store } from './script/slide/store'
// import { Editor } from './script/slide/slide'

const connector = connect(null)

export function App() {
    // const state: Editor = store.getState()
    // console.log('CurrentColor = ', state.presentation.color)

    return (
        <div className={'presentation'}>
            <Header />
            <Nav />
            <Workspace />
            <Footer />
        </div>
    )
}

export default connector(Workspace)