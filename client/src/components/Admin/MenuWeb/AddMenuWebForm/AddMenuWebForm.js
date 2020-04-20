import React, { useState } from 'react';
import { Form, Select, Icon, Input, notification, Button } from 'antd';

import './AddMenuWebForm.scss'

export default function AddMenuWebForm(props) {
    return (
        <div className="add-menu-web-form">
            <AddForm/>
        </div>
    );
}

function AddForm(props) {
    const { Option } = Select;

    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{ width: 90 }}
            // onChange={}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    return (
        <Form className="form-add">
            <Form.Item>
                <Input
                    prefix={<Icon type="font-size"/>}
                    placeholder="Título"
                    // value={}
                    // onChange={}
                    />
            </Form.Item>
            <Form.Item>
                <Input 
                    addonBefore={selectBefore}
                    placeholder="Url"
                    // value={}
                    // onChange={}
                    />
            </Form.Item>
            <Form.Item>
                <Button className="btn-submit" type="primary" htmlType="submit">
                    Crear menú
                </Button>
            </Form.Item>
        </Form>
    );
}