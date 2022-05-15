import React from "react";
import Layout from "./Layout";
import { Route } from 'react-router';
import HomePage from "./Home/HomePage";
import AddBlogPost from "./Admin/AddBlogPost";
import ViewPost from "./ViewPost/ViewPost";

function App() {
    return <Layout>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/admin' component={AddBlogPost} />
        <Route exact path='/viewpost/:id' component={ViewPost} />
    </Layout>
}

export default App;