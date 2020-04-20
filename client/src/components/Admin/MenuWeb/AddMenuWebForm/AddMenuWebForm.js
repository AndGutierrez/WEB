import React, { useState } from 'react';
import { Form, Select, Icon, Input, notification, Button } from 'antd';

import { addMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './AddMenuWebForm.scss'

export default function AddMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb } = props;
    const [menuData, setMenuData] = useState({});

    const addMenu = event => {
        event.preventDefault();
        
        console.log('Creando menú');
        console.log(menuData);

        let menuDataToAdd = {
            title: menuData.title,
            url: (menuData.http ? menuData.http : "http://") + menuData.url
        }

        if (!menuDataToAdd.title || !menuDataToAdd.url) {
                notification["error"]({ message: "Todos los campos son obligatorios" });
        } else {
            const accessToken = getAccessTokenApi();

            menuDataToAdd.active = false;
            menuDataToAdd.order = 1000;            

            addMenuApi(accessToken, menuDataToAdd)
                .then(response => {
                notification["success"]({ message: response });

                setIsVisibleModal(false);
                setReloadMenuWeb(true);
                setMenuData({});
                })
                .catch(err => {
                notification["error"]({ message: err });
            });
        }
    };

    return (
        <div className="add-menu-web-form">
            <AddForm 
                menuData={menuData} 
                setMenuData={setMenuData}
                addMenu={addMenu}/>
        </div>
    );
}

function AddForm(props) {
    const { menuData, setMenuData, addMenu } = props;
    const { Option } = Select;

    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{ width: 90 }}
            onChange={e => setMenuData({ ...menuData, http: e })}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    return (
        <Form className="form-add" onSubmit={addMenu}>
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
                    addonBefore={selectBefore}
                    placeholder="Url"
                    value={menuData.url}
                    onChange={e => setMenuData({ ...menuData, url: e.target.value })}
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