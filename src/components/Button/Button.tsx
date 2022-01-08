
interface ButtonProps {
    className: string,
    onClick?: Function,
    title?: string
}

export default function Button(props: ButtonProps) {
    return (
        <button className={props.className} onClick={() => (props.onClick == undefined ? null : props.onClick())} title={props.title} />
    )
}