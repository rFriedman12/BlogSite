import React from 'react';
import format from 'date-fns/format';

function Comment({ comment }) {
    const { name, dateCreated, text } = comment;

    return <div className="media mb-4">
        <div className="media-body">
            <h5 className="mt-0">{name}
                <small className="ml-1">{format(new Date(dateCreated), 'EEEE LLLL do, R')}</small>
            </h5>
            {text}
        </div>
    </div>
}

export default Comment;