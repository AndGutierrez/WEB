import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getMenusApi } from '../../../api/menu';
import { getAccessTokenApi } from '../../../api/auth';
import logo from '../../../assets/img/png/adminlogo.png';

import './MenuTop.scss';

export default function MenuTop() {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        const accessToken = getAccessTokenApi();

        getMenusApi(accessToken).then(response => {
            const arrayMenu = [];
            response.menus.forEach(item => {
                item.active && arrayMenu.push(item);
            });
            setMenuData(arrayMenu);
        });
    }, []);

    return (
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}>
                    <img src={logo} alt="Andrés Gutiérrez Vera"/>
                </Link>
            </Menu.Item>

            {menuData.map(item => {
                const external = item.url.indexOf("http") > -1 ? true : false;

                if (external) {
                    return (
                        <Menu.Item className="menu-top-web__item" key={item._id}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            </Menu.Item>
                    );
                } else {
                    return (
                        <Menu.Item className="menu-top-web__item" key={item._id}>
                            <Link to={item.url}>
                                {item.title}
                            </Link> 
                        </Menu.Item>
                    );
                }
            })}

            <div>
                Social Media...
            </div>
        </Menu>
    );
};