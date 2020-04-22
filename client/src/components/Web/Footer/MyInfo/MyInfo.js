import React from 'react'
import Logo from '../../../../assets/img/png/adminlogo.png';
import SocialLinks from '../../SocialLinks/SocialLinks';

import "./MyInfo.scss";

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={Logo} alt="Andrés Gutiérrez Vera"/>
            <h4>
                Aprende a diseñar páginas web, creando proyectos complejos!!!
            </h4>
            <SocialLinks/>
        </div>
    );
} 