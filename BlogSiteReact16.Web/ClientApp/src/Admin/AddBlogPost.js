import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddBlogPost() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const history = useHistory();

    async function onSubmitClick() {
        await axios.post('/api/blogposts/post', { title, text });
        history.push('/');
    }

    function onTitleChange(e) {
        setTitle(e.target.value);
    }

    function onTextChange(e) {
        setText(e.target.value);
    }

    return <div className="row mt-5">
        <div className="col-md-8 offset-md-2 card card-body bg-light mt-5">
            <input className="form-control" placeholder="Title" name="title" value={title} onChange={onTitleChange} />
            <br />
            <textarea
                name="text"
                placeholder="What's on your mind?"
                className="form-control" rows="15"
                value={text}
                onChange={onTextChange}></textarea>
            <br />
            <button className="btn btn-primary" onClick={onSubmitClick}>Submit Post!</button>
        </div>
    </div>
}

export default AddBlogPost;