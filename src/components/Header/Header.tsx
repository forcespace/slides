import {Editor} from '../../script/slide/slide'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setTitle} from '../../script/slide/actionCreators'
import styles from './header.module.css'
import {AnyAction} from 'redux'
import React from 'react'

const mapStateToProps = (state: Editor): {title: string} => ({
    title: state.presentation?.title
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => AnyAction) => ({
    setTitle: (newTitle: string) => dispatch(setTitle(newTitle))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

function Header(props: PropsFromRedux) {
    function handleTitleChange(event: React.FocusEvent<HTMLInputElement>) {
        props.setTitle(event.target.textContent || `Презентация от ${new Date().toLocaleString('ru-RU')}`)
    }

    return (
        <header className={styles.main}>
            <div className={styles.wrapper}>
                <h1 className={styles.title} contentEditable onBlur={handleTitleChange} suppressContentEditableWarning>{props.title}</h1>
            </div>
        </header>
    )
}

export default connector(Header)