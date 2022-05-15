import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';
import Comment from './Comment';

function ViewPost() {

    const [blogPost, setBlogPost] = useState({
        title: '',
        text: '',
        dateCreated: ''
    });
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const { id } = useParams();

    useEffect(() => {
        async function getBlogPost() {
            const { data } = await axios.get(`/api/blogposts/getpost?id=${id}`);
            const { title, text, dateCreated, comments } = data;
            setBlogPost({ title, text, dateCreated });
            setComments(comments);
        }

        getBlogPost();
    }, []);

    function onNameChange(e) {
        setName(e.target.value);
    }

    function onCommentTextChange(e) {
        setCommentText(e.target.value);
    }

    async function onSubmitClick() {
        await axios.post('/api/blogposts/addcomment', { name, text: commentText, blogPostId: id });
        const { data } = await axios.get(`/api/blogposts/getcomments?blogPostId=${id}`);
        setComments(data);
        setName('');
        setCommentText('');
    }

    const { title, text, dateCreated } = blogPost;

    return <div className='container mt-5'>
        <div className='row mt-5'>
            <div className='col-lg-8'>
                <h1>{title}</h1>
                <hr />
                <p>Posted on {!!dateCreated && format(new Date(dateCreated), 'EEEE LLLL do, R')}</p>
                <hr />
                <p>{text}</p>
                <hr />
                <div className="card my-4">
                    <h5 className="card-header">Leave a Comment:</h5>
                    <div className="card-body">
                        <div className="form-group">
                            <input placeholder="Name" className="form-control" name="name" value={name} onChange={onNameChange} />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Type your comment here..."
                                name="commentText"
                                className="form-control"
                                value={commentText}
                                rows="3"
                                onChange={onCommentTextChange}></textarea>
                        </div>
                        <button className="btn btn-primary" onClick={onSubmitClick}>Submit</button>
                    </div>
                </div>
                {comments.map(c => {
                    return <Comment key={c.id} comment={c} />
                })}
            </div>
        </div>
    </div>
}

export default ViewPost;