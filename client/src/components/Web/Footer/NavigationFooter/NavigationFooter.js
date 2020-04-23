import React from 'react';
import { Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import './NavigationFooter.scss';

export default function NavigationFooter() {
    return (
        <Row className="navigation-footer">
            <Col>
                <h3>Navegación</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft/>
            </Col>
            <Col md={12}>
                <RenderListRight/>
            </Col>
        </Row>
    );
}

function RenderListLeft() {
    return (
        <ul>
            <li>
                <a href="http://10.0.75.1:3000/">
                    <Icon type="book"/> Cursos Online
                </a>
            </li>
            <li>
                <Link to="/contact">
                    <Icon type="code"/> Desarrollo Web
                </Link>
            </li>
            <li>
                <a href="http://10.0.75.1:3000/">
                    <Icon type="database"/> Base de Datos
                </a>
            </li>
            <li>
                <a href="http://10.0.75.1:3000/">
                    <Icon type="right"/> Política de Privacidad
                </a>
            </li>
        </ul>
    );
}

function RenderListRight() {
    return (
        <ul>
            <li>
                <a href="http://10.0.75.1:3000/">
                    <Icon type="hdd"/> Sistemas / Servidores
                </a>
            </li>
            <li>
                <a href="http://10.0.75.1:3000/">
                    <Icon type="appstore"/> CMS
                </a>
            </li>
            <li>
                <a href="http://10.0.75.1:3000/">
                    <Icon type="user"/> Portfolio
                </a>
            </li>
            <li>
                <a href="http://10.0.75.1:3000/">
                    <Icon type="right"/> Política de Cookies
                </a>
            </li>
        </ul>
    );
}