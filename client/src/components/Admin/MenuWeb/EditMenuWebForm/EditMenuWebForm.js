import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, notification, Button } from 'antd';

import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './EditMenuWebForm.scss'

export default function EditMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb, menu} = props;
    const [menuData, setMenuData] = useState({});
    
    useEffect(() => {
        setMenuData(menu);
    }, [menu]);

    const editMenu = event => {
        event.preventDefault();

        if (!menuData.title || !menuData.url) {
                notification["error"]({ message: "Todos los campos son obligatorios" });
        } else {
            const accessToken = getAccessTokenApi();

            updateMenuApi(accessToken, menuData._id, menuData)
                .then(response => {
                    notification["success"]({ message: response });

                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                })
                .catch(err => { 
                    notification["error"]({ message: err });
            });
        }
    };

    return (
        <div className="edit-menu-web-form">
            <EditForm 
                menuData={menuData} 
                setMenuData={setMenuData}
                editMenu={editMenu}/>
        </div>
    );
}

function EditForm(props) {
    const { menuData, setMenuData, editMenu } = props;

    return (
        <Form className="form-edit" onSubmit={editMenu}>
            <Form.Item>
                <Input
                    prefix={<Icon type="font-size"/>}
                    placeholder="Título"
                    value={menuData.title}
                    onChange={e => setMenuData({ ...menuData, title: e.target.value })}
                    />
            </Form.Item>
            <Form.Item>
                <Input 
                    placeholder="Url"
                    value={menuData.url}
                    onChange={e => setMenuData({ ...menuData, url: e.target.value })}
                    />
            </Form.Item>
            <Form.Item>
                <Button className="btn-submit" type="primary" htmlType="submit">
                    Actualizar menú
                </Button>
            </Form.Item>
        </Form>
    );
}