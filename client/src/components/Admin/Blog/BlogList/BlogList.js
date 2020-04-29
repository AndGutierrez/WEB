import React from 'react';
import { List, Button, Icon, Modal, notification } from "antd";
import { Link } from "react-router-dom";

import './BlogList.scss';

export default function BlogList(props) {
    const { blogs } = props;
    const { confirm } = Modal;

    return (
        <div className="blog-list">
            <List 
                dataSource={blogs.docs}
                renderItem={blog => <Blog blog={blog}/>}
            />
        </div>
    )
}

function Blog(props) {
    const { blog } = props;

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
                 <Button type="primary">
                     <Icon type="edit"/>
                 </Button>,
                <Button type="danger">
                    <Icon type="delete"/>
                </Button>            
            ]}            
        >
            <List.Item.Meta title={blog.title}/>
        </List.Item>
    );
}