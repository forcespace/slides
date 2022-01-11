import {connect} from 'react-redux'
import {Text} from '../../../../script/slide/slide'

type Props = {
    text: Text,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

function TextSvg(props: Props) {
    return (
        <span>{props.text.content}</span>
    )
}

export default connect()(TextSvg)