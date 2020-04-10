import React from "react";
import AdminLogo from "../../../assets/img/png/adminlogo.png";
import { Button, Icon } from "antd";
import { logout } from '../../../api/auth';

import "./MenuTop.scss";
import { Link } from "react-router-dom";

export default function MenuTop(props) {
    const { menuCollapsed, setMenuCollapsed} = props;

    const logonUser = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <Link to={"/admin"}>
                    <img className="menu-top__left-logo" 
                        src={AdminLogo}
                        alt="Andrés Gutiérrez"/>
                </Link>
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    <Icon type={menuCollapsed ? "menu-unfold" : "menu-fold"} />
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={ logonUser }>
                    <Icon type="poweroff" />            
                </Button>
            </div>
        </div>
    );
}