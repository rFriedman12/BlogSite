import React, { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import axios from 'axios';

function HomePage(props) {
    const [blogPosts, setBlogPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function getBlogPosts() {
            const blogPosts = await axios.get(`/api/blogposts/getall?skip=${skip}`);
            const total = await axios.get('/api/blogposts/totalposts');
            setBlogPosts(blogPosts.data);
            setTotal(total.data);
        }

        getBlogPosts();
    }, [skip]);

    function onOlderClick() {
        setSkip(skip + 3);
    }

    function onNewerClick() {
        setSkip(skip - 3);
    }

    function generateNewerButtons() {
        if (skip !== 0) {
            return <li className="page-item">
                <a className="page-link" onClick={onNewerClick}>Newer &rarr;</a>
            </li>
        }
        else {
            return null;
        }
    }

    function generateOlderButton() {
        if (skip + 3 < total) {
            return <li className="page-item">
                <a className="page-link" onClick={onOlderClick}>&larr; Older</a>
            </li>
        }
        else {
            return null;
        }
    }

    return <div className="container">
        <div className="row">
            <div className="col-md-8">
                <h1 className="my-4">
                    LIT Blog
                    <small> Nothing to see here...</small>
                </h1>
                {blogPosts.map(bp => {
                    return <BlogPost key={bp.id} blogPost={bp} />
                })}

                <ul className="pagination justify-content-center mb-4">
                    {generateOlderButton()}
                    {generateNewerButtons()}
                </ul>

            </div>
        </div>
    </div>
}

export default HomePage;