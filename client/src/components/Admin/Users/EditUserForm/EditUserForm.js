import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Form, Icon, Input, Select, Button, Row, Col } from 'antd';
import { useDropzone } from 'react-dropzone';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { getAvatarApi } from '../../../../api/user';

import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const { user } = props;
    const [ avatar, setAvatar ] = useState(null);
    const [ userData, setUserData ] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        });
    }, [user]);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {       
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

    const updateUser = e => {
        e.preventDefault();
        console.log(userData);
    }    
    
    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
            <EditForm userData={userData} 
                setUserData={setUserData}
                updateUser={updateUser}/>
        </div>
    );
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) });
        },
        [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar}/>                
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
             )} 
        </div>
    );
}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className="form-edit" onSubmit={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="user"/>}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({...userData, name: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="user"/>}
                            placeholder="Apellidos"
                            value={userData.lastname}
                            onChange={e => setUserData({...userData, lastname: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="mail"/>}
                            placeholder="Correo electrónico"
                            value={userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selección rol usuario"
                            onChange={e => setUserData({...userData, role: e})}
                            value={userData.role}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="revisor">Revisor</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="lock"/>}
                            type="password"
                            placeholder="Contraseña"
                            value={userData.password}
                            onChange={e => setUserData({...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="lock"/>}
                            type="password"
                            placeholder="Repetir contraseña"
                            value={userData.repeatPassword}
                            onChange={e => setUserData({...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button className="btn-submit" type="primary" htmlType="submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}