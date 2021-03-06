import React, { useState, useEffect } from 'react';
import { List, Switch, Icon, Button, Modal as ModalAntd, notification } from 'antd';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable';

import { updateMenuApi, activateMenuApi, deleteMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';

import './MenuWebList.scss';

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
    const { menus, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    
    useEffect(() => {
        const listItemsArray = [];

        menus.forEach(item => {            
            listItemsArray.push({
                content: (
                    <MenuItem 
                        item={item} 
                        activateMenu={activateMenu}
                        editMenuModal={editMenuModal}
                        deleteMenu={deleteMenu}
                    />
                )
            });
        });
        setListItems(listItemsArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menus]);

    const activateMenu = (menu, status) => {
        const accesToken = getAccessTokenApi();
        activateMenuApi(accesToken, menu._id, status).then(response => {
          notification["success"]({ message: response });
        });
      };

    const onSort = (sortedList, dropEvent) => {
        const accesToken= getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;

            updateMenuApi(accesToken, _id, { order } );
        });
    };

    const addMenuModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo menú");
        setModalContent(
            <AddMenuWebForm 
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
            />
        );
    };

    
    const deleteMenu = menu => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminar menú",
            content: `¿Está seguro que desea eliminar el menú ${menu.title}?`,
            okText: "Si",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteMenuApi(accessToken, menu._id)
                    .then(response => {
                        notification["success"]({ 
                            message: response 
                        });
                        setReloadMenuWeb(true);
                    })
                    .catch(err => {
                        notification["error"]({ 
                            message: err 
                        });
                    });
            } 
        });
    };

    const editMenuModal = menu => {
        setIsVisibleModal(true);
        setModalTitle(`Editando menú: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm 
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
                menu={menu}
            />
        );
    };

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuModal}>Crear menú</Button>
            </div>

             <div className="menu-web-list__items">
                <DragSortableList type="vertical"
                    items={listItems}
                    onSort={onSort}/>
             </div>

             <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
             >
                {modalContent}
             </Modal>
        </div>
    );
}

function MenuItem(props) {
    const { item, activateMenu, editMenuModal, deleteMenu } = props;

    return (
        <List.Item
            actions={[
                <Switch
                    defaultChecked={item.active} 
                    onChange={e => activateMenu(item, e)}
                />,
                <Button type="primary" onClick={() => editMenuModal(item)}>
                    <Icon type="edit"/>
                </Button>,
                <Button type="danger" onClick={() => deleteMenu(item)}>
                    <Icon type="delete"/>
                </Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.url}/>
        </List.Item>
    );
}