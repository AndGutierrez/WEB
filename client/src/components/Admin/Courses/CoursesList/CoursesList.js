import React, { useState, useEffect } from 'react';
import DragSortableList from 'react-drag-sortable';
import { List, Icon, Button, Modal as ModalAntd, notification, Row, Col } from 'antd';
import Modal from '../../../Modal';

import { getAccessTokenApi } from '../../../../api/auth';
import { getCourseDataUdemyApi, deleteCourseApi } from '../../../../api/course';

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
                    <Course course={course}
                        deleteCourse={deleteCourse} />
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

            
    const deleteCourse = course => {
        const { confirm } = ModalAntd;
        
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminar curso",
            content: `¿Está seguro que desea eliminar el curso ${course.idCourse}?`,
            okText: "Si",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteCourseApi(accessToken, course._id)
                    .then(response => {
                        const typeNotification = response.code === 200 ? "success" : "warning";

                        notification[typeNotification]({ 
                            message: response.message
                        });
                        setReloadCourses(true);
                    })
                    .catch(() => {
                        notification["error"]({ 
                            message: "Error del servidor, intentelo más tarde."
                        });
                    });
            } 
        });
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
    const { course, deleteCourse} = props;
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
                <Button type="danger" onClick={() => deleteCourse(course) }>
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