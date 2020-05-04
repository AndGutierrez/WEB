import React from 'react';
import { List, Button, Icon, Modal, notification } from "antd";
import { Link } from "react-router-dom";
import { deleteBlogApi } from '../../../../api/blog';
import { getAccessTokenApi } from '../../../../api/auth';

import './BlogList.scss';

export default function BlogList(props) {
    const { blogs, setReloadBlogs, editBlog } = props;
    const { confirm } = Modal;

    const deleteBlog = blog => {       
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminar blog",
            content: `¿Está seguro que desea eliminar el blog ${blog.title}?`,
            okText: "Si",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteBlogApi(accessToken, blog._id)
                    .then(response => {
                        const typeNotification = response.code === 200 ? "success" : "warning";

                        notification[typeNotification]({ 
                            message: response.message
                        });
                        setReloadBlogs(true);
                    })
                    .catch(() => {
                        notification["error"]({ 
                            message: "Error del servidor, intentelo más tarde."
                        });
                    });
            } 
        });
    };

    return (
        <div className="blog-list">
            <List 
                dataSource={blogs.docs}
                renderItem={blog => <Blog blog={blog} deleteBlog={deleteBlog} editBlog={editBlog}/>}
            />
        </div>
    )
}

function Blog(props) {
    const { blog, deleteBlog, editBlog } = props;

    return (
        <List.Item 
            actions={[
                <Link to={`/blog/${blog.url}`} target="_blank">
                    <Button 
                        type="primary" 
                    >
                        <Icon type="eye"/>
                    </Button>
                </Link>,                 
                 <Button type="primary" onClick={() => editBlog(blog)}>
                     <Icon type="edit"/>
                 </Button>,
                <Button type="danger" onClick={() => deleteBlog(blog)}>
                    <Icon type="delete"/>
                </Button>            
            ]}            
        >
            <List.Item.Meta title={blog.title}/>
        </List.Item>
    );
}