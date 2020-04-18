import React, { useState, useEffect } from 'react';
import { List } from 'antd';

export default function MenuWebList(props) {
    const { menus, setReloadMenuWeb } = props;

    return (
        <div>
            <h1>Menu Web List</h1>
            {menus.map(item => (
                <p key={item._id}>{item.title}</p>
            ))}
        </div>
    );
}