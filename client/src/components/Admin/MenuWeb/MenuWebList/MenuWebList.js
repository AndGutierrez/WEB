import React, { useState, useEffect } from 'react';
import { List, Switch, Icon, Button, Modal as ModalAntd, notification } from 'antd';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable';

import './MenuWebList.scss';

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
    const { menus, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setmodalContent] = useState(null);

    console.log(listItems);
    
    useEffect(() => {
        const listItemsArray = [];

        menus.forEach(item => {
            
            listItemsArray.push({
                content: <MenuItem item={item}/>
            });
        });
        setListItems(listItemsArray);
    }, [menus])

    const onSort = (sortedList, dropEvent) => {
        console.log("sortedList", sortedList);
    };

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary">Menu menú</Button>
            </div>

             <div className="menu-web-list__items">
                <DragSortableList type="vertical"
                    items={listItems}
                    onSort={onSort}/>
             </div>
        </div>
    );
}

function MenuItem(props) {
    const { item } = props;

    return (
        <List.Item
            actions={[
                <Switch defaultChecked={item.active}/>,
                <Button type="primary">
                    <Icon type="edit"/>
                </Button>,
                <Button type="danger">
                    <Icon type="delete"/>
                </Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.url}/>
        </List.Item>
    );
}
