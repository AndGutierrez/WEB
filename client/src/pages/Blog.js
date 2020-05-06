import React from 'react';
import { Row, Col } from 'antd';
import { useParams } from "react-router-dom";
import BlogsListWeb from '../components/Web/Blog/BlogsListWeb';
import BlogInfo from '../components/Web/Blog/BlogInfo';

export default function Blog(props) {
    const { location, history } = props;
    const { url } = useParams();

    return (
        <Row>
            <Col md={4}/>
            <Col md={16}>
                {url ? <BlogInfo url={url}/> : (
                    <BlogsListWeb location={location} history={history} />
                )}
            </Col>
            <Col md={4}/>
        </Row>
    );
}