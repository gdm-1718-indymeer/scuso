import React from 'react'

export default ({ message, from }) =>
    <div className={(from === 'Jonas' ? 'you-parent' : 'other-parent')}>
        <div className={"message-bubble " + (from === 'Jonas' ? 'you' : 'other-guy')}>
            <strong>{from}:&nbsp;</strong>{message}
        </div>
    </div>
