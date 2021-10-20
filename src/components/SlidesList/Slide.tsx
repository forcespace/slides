import * as React from 'react';
// import '../../style/block/slide/slide.css'

type Props = {
    content: any;
};

export function Slide(props: Props) {
    const {content} = props

    return (
        <>
            <span className={'b-slide-list__slide_count'}>{content.title}</span>
        </>
    );
}