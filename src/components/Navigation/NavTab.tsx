import NavTabs from '../NavTabs/NavTabs'
import styles from './nav.module.css'
import {connect, ConnectedProps} from 'react-redux'
import {Editor} from '../../script/slide/slide'

interface NavTabMenu {
    id: string,
    className: string,
    onClick: Function,
    name: string
}

const mapStateToProps = (state: Editor) => ({
    state
})

const connector = connect(mapStateToProps)
type Props = ConnectedProps<typeof connector> & {tabs: Array<NavTabMenu>, active: string}

function NavTab(props: Props) {
    return (
        <NavTabs className={styles.menu_list}>
            {props.tabs.map(tab =>
                <span key={Math.random()} className={`${tab.className} ${props.active === tab.id ? styles.active : ''}`}
                    onClick={() => (tab.onClick == undefined ? null : tab.onClick())}>
                    {tab.name}
                </span>)
            }
        </NavTabs>
    )
}

export default connector(NavTab)