import React from 'react';
import { Row, Col, Card, Icon } from 'antd';

import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
    return (
        <Row className="how-my-courses-work">
            <Col lg={24} className="how-my-courses-work__title">
                <h2>¿Como funciona mis cursos?</h2>
                <h3>
                    Cada curso cuenta con contenido bajo la web de Udemy, activa las 24
                    hora al día los 365 días del año
                </h3>
            </Col>
            
            <Col lg={4}/>
            <Col lg={16}>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo 
                            icon="clock-circle" 
                            title="Cursos y Clases"
                            description="Cursos de entre 10 y 30 horas y cada clase del curso con duración máxima de 15 minutos, fáciles de llevar en tu día a día de aprendizaje." 
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon="key" 
                            title="Acceso 24/7"
                            description="Cursos de entre 10 y 30 horas y cada clase del curso con duración máxima de 15 minutos, fáciles de llevar en tu día a día de aprendizaje." 
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon="message" 
                            title="Aprendizaje colaborativo"
                            description="Cursos de entre 10 y 30 horas y cada clase del curso con duración máxima de 15 minutos, fáciles de llevar en tu día a día de aprendizaje." 
                        />
                    </Col>
                </Row>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo 
                            icon="user" 
                            title="Mejora tu perfil"
                            description="Aprende y mejora tu perfil para actualizar tu perfil profesional." 
                        /> 
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon="dollar" 
                            title="Precios bajos"
                            description="Cursos muy económico con acceso por tiempo ilimitado y con soporte ilimitado." 
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                            icon="check-circle" 
                            title="Certificado"
                            description="Obtén certificación que acredita tu aprendizaje." 
                        />
                    </Col>
                </Row>                    
            </Col>
            <Col lg={4}/>
        </Row>
    );
}

function CardInfo(props) {
    const { icon, title, description } = props;
    const { Meta } = Card;

    return (
        <Card className="how-my-courses-work__card">
            <Icon type={icon}/>
            <Meta title={title} description={description}/>
        </Card>
    );
}