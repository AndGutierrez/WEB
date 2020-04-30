import React, { useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { getBlogsApi } from '../../../api/blog';
import Modal from '../../../components/Modal';
import BlogList from '../../../components/Admin/Blog/BlogList';
import Pagination from '../../../components/Pagination';
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
        setReloadBlogs(false);
    }, [page, reloadBlogs]);

    if (!blogs) {
        return null;
    }
        
    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary">
                    Nuevo blog
                </Button>
            </div>
            
            <BlogList blogs={blogs}/>
            
            <Pagination blogs={blogs} location={location} history={history}/>

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