import axios from "axios";
import React from 'react';
import { Link, useHistory } from 'react-router-dom'

function Layout({ children }) {
    const history = useHistory();

    async function onMostRecentClick() {
        const { data } = await axios.get('/api/blogPosts/mostRecent');
        history.push(`/viewpost/${data}`);
    }

    return <div>
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                <div className="container">
                    <a className="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">React People Cars</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link to='/' className='nav-link text-light'>
                                    Home
                                </Link>
                            </li>                            
                            <li className="nav-item">
                                <Link onClick={onMostRecentClick} className='nav-link text-light'>
                                    Most Recent
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/admin' className='nav-link text-light'>
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <div className="container" style={{ marginTop: 60 }}>
            {children}
        </div>
    </div>
}

export default Layout;