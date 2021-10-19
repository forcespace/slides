import React from 'react';
import './style/block/workspace/workspace.css';
import './style/main.css';

function Workspace() {
    return (
        <section className={'b-workspace'}>
            <div className={'b-workspace_primary'}>123</div>
            <div className={'b-workspace_secondary'}>456</div>
        </section>
    );
}

export {
    Workspace
}