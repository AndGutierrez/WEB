import React, { useState } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { suscribeNewsletterApi } from '../../../api/newsletter'

import './Newsletter.scss';

export default function Newsletter() {
    const [email, setEmail] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const resultValidation = emailValid.test(email);

        if(!resultValidation) {
            notification["error"]({ message: "Correo electrónico no válido." });
            return;
        }
        
        suscribeNewsletterApi(email).then(response => {
            if (response.code == 200) {
                notification["success"]({ message: response.message });
                setEmail("");
            } else {
                notification["warning"]({ message: response.message });
                return;
            }
        })
    };

    return (
        <div className="newsletter">
            <h3>Newsletter</h3>
            <Form onSubmit={onSubmit}>
                <Form.Item>
                    <Input prefix={<Icon type="user" style={{ color: "rgba(0, 0, 0, 0.25" }} />} 
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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