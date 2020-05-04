import React, { useEffect, useState } from 'react';
import { Spin, List, notification } from 'antd';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Pagination from "../../../Pagination";
import moment from 'moment';
import 'moment/locale/es';
import { getBlogsApi } from '../../../../api/blog';

import './BlogsListWeb.scss';

export default function BlogsListWeb(props) {
    const { location, history } = props;
    const [blogs, setBlogs] = useState(null);
    const { page= 1} = queryString.parse(location.search);

    console.log("Página: ", page);
    console.log(history);    

    useEffect(() => {
        getBlogsApi(page, 12)
        .then(respose => {
            if (respose.code !== 200) {
                notification["warning"]({ message: respose.message });
            } else {
                setBlogs(respose.blogs);
            }
        }).catch(() => {
            notification["error"]({ message: "Error del servidor" });
        });
    }, [page]);
    
    if (!blogs) {
        return (
            <Spin 
                tip="Cargando blogs" 
                style={{ textAlign: "center", width: "100%", padding: "200px 0" }}/>
        );
    }

    return (
        <div className="posts-list-web">
            <h1>Blog</h1>
            <List dataSource={blogs.docs} renderItem={blog => <Blog blog={blog}/>}/>
            <Pagination blogs={blogs} location={location} history={history}/>
        </div>
    );
}

function Blog(props) {
    const { blog } = props;
    const day = moment(blog.date).format("DD");
    const month = moment(blog.date).format("MMMM");

    console.log(blog);
    
    return (
        <List.Item className="post">
            <div className="post__date">
                <span>{day}</span>
                <span>{month}</span>
            </div>
            <Link to={`blog/${blog.url}`}>
                <List.Item.Meta title={blog.title}/>
            </Link>
        </List.Item>
    );
}