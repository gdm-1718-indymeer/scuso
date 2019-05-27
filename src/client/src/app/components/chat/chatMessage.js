import React from 'react'

export default ({ name, message }) =>
    <div className="other-parent">
        <div className="message-bubble other-guy">
            <strong>{name}:&nbsp;</strong><em> {message}</em>
        </div>
    </div>
