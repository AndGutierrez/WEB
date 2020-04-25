import React, { useState, useEffect } from 'react';
import DragSortableList from 'react-drag-sortable';
import { List, Icon, Button, Modal as ModalAntd, notification, Row, Col } from 'antd';
import Modal from '../../../Modal';
import { getCourseDataUdemyApi } from '../../../../api/course';

import './CoursesList.scss';

export default function CoursesList(props) {
    const { courses, setReloadCourses } = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listCourseArray = [];

        courses.forEach(course => {            
            listCourseArray.push({
                content: (
                    <Course course={course} />
                    // <MenuItem 
                    //     course={course} 
                    //     activateMenu={activateMenu}
                    //     editMenuModal={editMenuModal}
                    //     deleteMenu={deleteMenu}
                    // />
                )
            });
        });
        setListCourses(listCourseArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses]);

    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
    };
    
    return (
        <div className="courses-list">
            <div className="courses-list__header">
                <Button type="primary" onClick={() => console.log('Creando curso...')}>
                    Nuevo curso
                </Button>
            </div>
            
            <div className="courses-list__items">
                {listCourses.length === 0 && (
                    <h2 style ={{ textAlign: "center", margin: 0 }}>
                        No tienes cursos creados.
                    </h2>
                )}
                <DragSortableList type="vertical"
                    items={listCourses}
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

function Course(props) {
    const { course } = props;
    const [courseData, setCourseData] = useState(null);
    
    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse).then(response => {
            if (response.code !== 200) {
                notification["warning"]({ message: `El curso con el id ${course.idCourse} no existe en Udemy.`});
            }
            setCourseData(response.data);
        });
    }, [course]);

    if (!courseData)
        return null;

    return (
        <List.Item 
            actions={[               
                <Button type="primary" onClick={() => console.log('Editar curso') }>
                    <Icon type="edit"/>
                </Button>,
                <Button type="danger" onClick={() => console.log('Eliminar curso')}>
                    <Icon type="delete"/>
                </Button>
            ]}
        >
            <img 
                src={courseData.image_480x270} 
                alt={courseData.title} 
                style={{ width: "100px", marginRight: "20px" }}/>
            <List.Item.Meta 
                title={`${courseData.title} - ${course.idCourse}`}
                description={courseData.headline}/>
        </List.Item>  
    );
}