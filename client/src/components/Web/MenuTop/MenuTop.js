import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/png/adminlogo.png';

import './MenuTop.scss';

export default function MenuTop() {
    return (
        <Menu className="menu-top" mode="horizontal">
            <Menu.Item className="menu-top__logo">
                <Link to={"/"}>>
                    <img src={logo} alt="Andrés Gutiérrez Vera"/>
                </Link>
            </Menu.Item>
            
            <Menu.Item className="menu-top__item">
                <Link to={"/"}>Home</Link>
            </Menu.Item>

            <Menu.Item className="menu-top__item">
                <Link to={"/contact"}>Contacto</Link>
            </Menu.Item>

            <div>
                Social Media...
            </div>
        </Menu>
    );
};