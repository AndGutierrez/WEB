import React from 'react';
import { Row, Col } from 'antd';
import { useParams, withRouter } from "react-router-dom";
import BlogsListWeb from '../components/Web/Blog/BlogsListWeb';

export default function Blog(props) {
    const { location, history } = props;
    const { url } = useParams();

    return (
        <Row>
            <Col md={4}/>
            <Col md={16}>
                {url ? <h1>En un blog</h1> : (
                    <BlogsListWeb location={location} history={history} />
                )}
            </Col>
            <Col md={4}/>
        </Row>
    );
}