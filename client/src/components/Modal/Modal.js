import React, { useState } from 'react';
import { Modal as ModalControl } from 'antd';

export default function Modal(props) {
    const { children, title, isVisible, setIsVisible } = props;

    return (
        <ModalControl
            title={title}
            centered
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={false}
        >
            {children}        
        </ModalControl>
    );
}