import React from 'react'
import styles from './logo.module.css'
import {connect} from 'react-redux'
import {Editor} from '../../script/slide/slide'

const mapStateToProps = (state: Editor): {state: Editor} => ({
    state: state
})

const connector = connect(mapStateToProps)

function Logo() {
    return (
        <div className={styles.logo_wrapper}>
            <p className={styles.text}>
                Site<br/>
                team
            </p>
        </div>
    )
}

export default connector(Logo)