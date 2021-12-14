import {Editor} from '../../script/slide/slide'
import {connect} from 'react-redux'
import {setTitle, ExtendedAction} from '../../script/slide/actionCreators'
import styles from './header.module.css'

function mapStateToProps(state: Editor): {title: string} {
    return {title: state.presentation.title} 
}

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => any) => {
    return {
        setTitle: (newTitle: string) => dispatch(setTitle(newTitle))
    }
}

function Header(props: {title: string, setTitle: Function})
{
    function handleTitleClick()
    {
        const newTitle = window.prompt('Заголовок презентации', props.title)
        if (newTitle) {
            props.setTitle(newTitle)
        }
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title} onClick={handleTitleClick}>
                {props.title}
            </h1>
        </header>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)