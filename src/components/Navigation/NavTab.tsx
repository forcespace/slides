import NavTabs from '../NavTabs/NavTabs'
import styles from './nav.module.css'

type NavTabMenu = {
    id: string,
    className: string,
    onClick: () => void,
    name: string
}

type Props = {
    tabs: Array<NavTabMenu>,
    active: string
}

export function NavTab(props: Props) {
    return (
        <NavTabs className={styles.menu_list}>
            {props.tabs.map(tab =>
                <span
                    key={Math.random()}
                    className={`${tab.className} 
                    ${props.active === tab.id ? styles.active : ''}`}
                    onClick={() => (tab.onClick == undefined ? null : tab.onClick())}
                >
                    {tab.name}
                </span>)
            }
        </NavTabs>
    )
}