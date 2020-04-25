import React from 'react'
import { List, Icon, Button } from 'antd';
import { getCourseDataUdemyApi } from '../../../../api/course';

import './CoursesList.scss';

export default function CoursesList(props) {
    const { courses, setReloadCourses } = props;
    
    courses.forEach(course => {
        console.log(course);
        getCourseDataUdemyApi(course.idCourse).then(response => {
            console.log(response);
        });        
    });
    
    return (
        <div>
            <h1>CoursesList...</h1>
        </div>
    );
}
