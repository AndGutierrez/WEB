import React, {useState, useEffect } from 'react';
import { Row, Col, Spin, notification } from 'antd';
import PresentationCourses from '../components/Web/Courses/PresentationCourses';
import CoursesList from '../components/Web/Courses/CoursesList';

import { getCoursesApi } from '../api/course';

export default function Courses() {
    return (
        <Row>
            <Col md={4}/>
            <Col md={16}>
                <PresentationCourses/>
                <CoursesList/>
            </Col>
            <Col md={4}/>
        </Row>
    );
}