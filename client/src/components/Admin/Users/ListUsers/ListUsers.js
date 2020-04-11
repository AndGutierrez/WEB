import React, { useState } from 'react';
import { Switch, List, Avatar, Button, Icon } from 'antd';
import NoAvatar from '../../../assets/img/png/083 no-avatar.png';
import Modal from '../../../Modal';

import './ListUsers.scss';

export default function ListUsers(props) {
    const { usersActive, usersInactive} = props;
    const [ viewUsersActives, setViewUsersActives ] = useState(true);

    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch
                    defaultChecked
                    onChange={() => setViewUsersActives(!viewUsersActives)}
                />
                <span>
                    {viewUsersActives ? "Usuarios activos" : "Usuarios inactivos"}
                </span>
            </div>

            {viewUsersActives ? <UsersActive usersActive={usersActive}/> 
                : <UsersInactive usersInactive={usersInactive}/>}

            <Modal
                title="Form modal"
                isVisible={true}
                setIsVisible={() => console.log('En modal')}
            >
                Hola este es mi primer Modal!
            </Modal>
        </div>
    );
}

function UsersActive(props) {
    const { usersActive } = props;

    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button
                            type="primary"   
                            onClick={() => console.log("Editar Usuario")}>
                            <Icon type="edit"/>
                        </Button>,
                        <Button
                            type="danger"   
                            onClick={() => console.log("Desactivar Usuario")}>
                            <Icon type="stop"/>
                        </Button>,
                        <Button
                            type="danger"   
                            onClick={() => console.log("Eliminar Usuario")}>
                            <Icon type="delete"/>
                        </Button>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={user.avatar ? user.avatar: NoAvatar} />}
                        title={`
                            ${user.name ? user.name: '...'}
                            ${user.lastname ? user.lastname : '...'}                            
                        `}
                        description={user.email}
                    />
                </List.Item>
            )}
        />
    );
}

function UsersInactive(props) {
    const { usersInactive } = props;

    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button
                            type="primary"   
                            onClick={() => console.log("Activar Usuario")}>
                            <Icon type="check"/>
                        </Button>,
                        <Button
                            type="danger"   
                            onClick={() => console.log("Eliminar Usuario")}>
                            <Icon type="delete"/>
                        </Button>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={user.avatar ? user.avatar: NoAvatar} />}
                        title={`
                            ${user.name ? user.name: '...'}
                            ${user.lastname ? user.lastname : '...'}                            
                        `}
                        description={user.email}
                    />
                </List.Item>
            )}
        />
    );
}