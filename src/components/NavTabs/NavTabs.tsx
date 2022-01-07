import React from 'react'

interface NavProps
{
    className: string,
    children: Array<React.ReactElement>
}

export default function NavTabs(props: NavProps)
{
    return (
        <div className={props.className}>
            {
                props.children.map((child: React.ReactElement) => child)
            }
        </div>
    )
}