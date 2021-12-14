import './App.css'
import {Nav} from './components/Navigation'
import Workspace from './components/Workspace/Workspace'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

export function App()
{
    return (
        <div className={'presentation'}>
            <Header/>
            <Nav/>
            <Workspace/>
            <Footer/>
        </div>
    );
}