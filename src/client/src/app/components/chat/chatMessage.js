import React from 'react'

export default ({ message, from }) =>
    <div className={(from == localStorage.getItem('userId') ? 'you-parent' : 'other-parent')}>

        <div className={"message-bubble " + (from == localStorage.getItem('userId') ? 'you' : 'other-guy')}>
            <p>{message}</p>
        </div>
    </div>
