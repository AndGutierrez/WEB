import React from 'react';
import { Layout, Row, Col } from 'antd';

import "./Footer.scss";

export default function Footer() {
    const { Footer } = Layout
    return (
        <Footer className="footer">
            <Row>
                <Col md={4}/>
                <Col md={16}>
                    <Row>
                        <Col md={8}>Mi información</Col>
                        <Col md={8}>Navegación</Col>
                        <Col md={8}>NewsLetter</Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>© 2020 ALL RIGHTS RESERVED​</Col>
                        <Col md={12}>Andreés Gutiérrez Vera | Desarrollador .NET y WEB</Col>
                    </Row>
                </Col>
                <Col md={4}/>                
            </Row>
        </Footer>
    );
}