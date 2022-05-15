import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format'

function BlogPost({ blogPost }) {
    const { id, title, text, comments, dateCreated } = blogPost;

    return <div className="card mb-4">
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p className="card-text">{text.legnth < 200 ? text : text.substring(0, 200)}</p>
            <small>{comments.length} comments</small>
            <br />
            <Link to={`/viewpost/${id}`} style={{ textDecoration: 'none' }}>
                <button className='btn btn-primary mt-3'>Read More &rarr;</button>
            </Link>
        </div>
        <div className="card-footer text-muted">
            Posted on {format(new Date(dateCreated), 'EEEE LLLL do, R')}
        </div>
    </div>
}

export default BlogPost;