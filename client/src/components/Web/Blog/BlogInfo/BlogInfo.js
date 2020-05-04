import React, { useEffect, useState } from 'react';
import { Spin, notification } from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import { getBlogApi } from '../../../../api/blog';

import './BlogInfo.scss';

export default function BlogInfo(props) {
    const { url } = props;
    const [blogInfo, setBlogInfo] = useState(null);

    console.log(blogInfo);
    
    useEffect(() => {
        getBlogApi(url) .then(respose => {
            if (respose.code !== 200) {
                notification["warning"]({ message: respose.message });
            } else {
                setBlogInfo(respose.blog);
            }
        }).catch(() => {
            notification["error"]({ message: "Error del servidor." });
        });
    }, [url]);
    
    if (!blogInfo) {
        return (
            <Spin tip="Cargando" style={{ textAlign: "center", width: "100%", padding: "200px 0" }}/>
        );
    }
    
    return (
        <div className="blog-info">
            <h1 className="blog-info__title">{blogInfo.title}</h1>
            <div className="blog-info__creation-date">
                {moment(blogInfo.date)
                .local("es")
                .format("LL")}
            </div>

            <div className="blog-info__description"
                dangerouslySetInnerHTML={{ __html: blogInfo.description }}/>
        </div>
    );
}