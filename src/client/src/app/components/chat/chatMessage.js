import React from 'react'

export default ({ message, from }) =>
    <div className={(from === 'Jonas' ? 'you-parent' : 'other-parent')}>

        <div className={"message-bubble " + (from === 'Jonas' ? 'you' : 'other-guy')}>
            <p><strong>{from}:&nbsp;</strong></p><br />
            <p>{message}</p>
        </div>
    </div>
