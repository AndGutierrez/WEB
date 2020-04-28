import React, { useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { getBlogsApi } from '../../../api/blog';
import Modal from '../../../components/Modal';
import queryString from 'query-string';

import './Blog.scss';

function Blog(props) {
    const { location, history } = props;
    const [blogs, setBlogs] = useState(null);    
    const [reloadBlogs, setReloadBlogs ] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const { page = 1 } = queryString.parse(location.search);

    console.log(blogs);

    useEffect(() => {
        getBlogsApi(page, 12)
        .then(response => {
                if (response?.code !== 200) {
                    notification["warning"]({ message: response.message });
                } else {
                    setBlogs(response.blogs);
                }
        })
        .catch(() => { 
            notification["error"]({ message: "Error del servidor" });
        });
    }, []);

    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary">
                    Nuevo blog
                </Button>
            </div>
            
            <h1>PostList...</h1>                    
            <h2>Paginación</h2> 

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width="25%"
            >
                {modalContent}
            </Modal>
        </div>
    );
}

export default withRouter(Blog);