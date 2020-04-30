import React, { useState, useEffect } from 'react';
import { Form, Icon, Row, Col, DatePicker, Input, Button, notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';
import { getAccessTokenApi } from '../../../../api/auth';
//import { addBlogApi, updateBlogApi } from "../../../../api/blog";

import "./AddEditBlogForm.scss";

export default function AddEditBlogForm(props) {    
    const { setIsVisibleModal, setReloadBlogs, blog } = props;
    const [blogData, setBlogData] = useState({});

    useEffect(() => {
        blog ? setBlogData(blog) : setBlogData({});
    }, [blog]);

    // const addBlog = e => {
    //     e.preventDefault();

    //     if (!blogData.idBlog) {
    //         notification["error"]({ message: "El id del curso es obligatorio" });
    //     } else {
    //         const accessToken = getAccessTokenApi();

    //         addBlogApi(accessToken, blogData)
    //             .then(response => {
    //                 const typeNotification = response.code === 200 ? "success" : "warning";
    //                 notification[typeNotification]({ message: response.message });
    //                 setIsVisibleModal(false);
    //                 setReloadBlogs(true);
    //                 setBlogData({});
    //             })
    //             .catch(() => {
    //                 notification["error"]({ message: "Error del servidor, intentelo más tarde." });
    //             });
    //     }
    // };

    // const updateBlog = e => {
    //     e.preventDefault();

    //     const accessToken = getAccessTokenApi();

    //     updateBlogApi(accessToken, blog._id, blogData)
    //     .then(response => {
    //         const typeNotification = response.code === 200 ? "success" : "warning";
    //         notification[typeNotification]({
    //         message: response.message
    //         });
    //         setIsVisibleModal(false);
    //         setReloadBlogs(true);
    //         setBlogData({});
    //     })
    //     .catch(() => {
    //         notification["error"]({
    //         message: "Error del servidor, intentelo más tarde."
    //         });
    //     });
    // };

    return (
        <div className="add-edit-blog-form">
            <AddEditForm
                blog={blog}
                blogData={blogData}
                setBlogData={setBlogData}
            />
        </div>
  );
}

function AddEditForm(props) {
    const { blog, addBlog, updateBlog, blogData, setBlogData } = props;

    return (
        <Form
            className="form-add-edit"
            layout="inline"
            // onSubmit={blog ? updateBlog : addBlog}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        prefix={<Icon type="font-size" />}
                        placeholder="Title"
                        value={blogData.title}
                        // onChange={e => setBlogData({ ...blogData, title: e.target.value })}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        prefix={<Icon type="link" />}
                        placeholder="Url"
                        value={blogData.link}
                        // onChange={e => setBlogData({ ...blogData, link: e.target.value })}
                        />
                </Col>
                <Col span={8}>
                    <DatePicker
                        style={{ width: "100%"}}
                        format="DD/MM/YYY HH:mm:ss"
                        placeholder="Fecha de publicación"
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        // value={blogData.date}
                        // onChange={}
                    />
                </Col>
            </Row>

            <Editor
                value=""
                init={{
                height: 400,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                // onEditorChange={this.handleEditorChange}
            /> 
            <Button type="primary" htmlType="submit" className="btn-submit">
                {blog ? "Actualizar blog" : "Crear blog"}
            </Button>
 
        </Form>
    );
}