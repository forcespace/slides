import './App.css'
import Workspace from './components/Workspace/Workspace'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Nav from './components/Navigation/Nav'
import {connect} from 'react-redux'

const connector = connect(null)

export function App() {

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