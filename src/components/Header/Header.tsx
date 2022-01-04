import {Editor} from '../../script/slide/slide';
import {connect} from 'react-redux';
import {ExtendedAction, setTitle} from '../../script/slide/actionCreators';
import styles from './header.module.css';
import {AnyAction} from 'redux';
import React from 'react';

function mapStateToProps(state:
    {presentationReducer: Editor}): {title: string}
{
    return {
        title: state.presentationReducer.presentation?.title
    };
}

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => AnyAction) =>
{
    return {
        setTitle: (newTitle: string) => dispatch(setTitle(newTitle))
    };
};

function Header(props: {title: string, setTitle: Function})
{
    function handleTitleChange(event: React.FocusEvent<HTMLInputElement>)
    {
        props.setTitle(event.target.textContent || `Презентация от ${new Date().toLocaleString('ru-RU')}`);
    }

    return (
        <header className={styles.main}>
            <div className={styles.wrapper}>
                <h1 className={styles.title} contentEditable onBlur={handleTitleChange} suppressContentEditableWarning>{props.title}</h1>
            </div>
        </header>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);