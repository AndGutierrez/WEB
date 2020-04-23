import React from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';

import './Newsletter.scss';

export default function Newsletter() {
    const onSubmit = e => {
        e.preventDefault();
        console.log("Newsletter enviado");        
    };

    return (
        <div className="newsletter">
            <h3>Newsletter</h3>
            <Form onSubmit={onSubmit}>
                <Form.Item>
                    <Input prefix={<Icon type="user" style={{ color: "rgba(0, 0, 0, 0.25" }} />} 
                        placeholder="Correo electrónico"
                        // value={}
                        // onChange={}
                    />
                </Form.Item>
                <Form.Item>
                    <Button className="login-form-button" 
                        htmlType="submit"
                        type="primary"
                    >
                        Suscribirse!!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
} 