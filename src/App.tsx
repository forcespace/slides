import './App.css'
import Workspace from './components/Workspace/Workspace'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Nav from './components/Navigation/Nav'

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