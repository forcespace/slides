import * as React from 'react';

type Props = {
    content: any;
};

export function Slide(props: Props) {
    const {content} = props

    return (
        <>
            <h1>{content.title}</h1>
        </>
    );
};