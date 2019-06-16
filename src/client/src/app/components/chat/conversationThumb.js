import React, {Component} from 'react'

export default ({ preview, fromWho }) =>
    <div className={'thumb-container'}>
        <p className={'thumb-from'}>{fromWho}</p>
        <p className={'thumb-content'}>{preview}</p>
    </div>