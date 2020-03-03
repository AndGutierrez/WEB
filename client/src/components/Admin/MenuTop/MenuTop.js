import React from "react";
import AdminLogo from "../../../assets/img/png/adminlogo.png";
import { Button, Icon } from "antd";

import "./MenuTop.scss";

export default function MenuTop() {
    return (
        <div className="menu_top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo" 
                    src={AdminLogo}
                    alt="Andrés Gutiérrez"
                />
                <Button type="link" onClick={() => console.log ('Click.')}>
                    <Icon type="menu-fold" />
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={()=> console.log('Desconexión.')}>
                    <Icon type="poweroff" />            
                </Button>
            </div>
        </div>
    );
}