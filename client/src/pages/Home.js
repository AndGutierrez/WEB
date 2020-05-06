import React from 'react';
import { Helmet } from 'react-helmet';
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses/HomeCourses';
import HowMyCoursesWork from '../components/Web/HowMyCoursesWork';
import ReviewCourses from '../components/Web/ReviewCourses';

export default function Home(){
    return (
        <>        
            <Helmet>
                <title>Andrés Gutiérrez Vera</title>
                <meta 
                    name="description" 
                    content="Home | Web sobre programación" 
                    data-react-helmet="true"/>
            </Helmet>
            <MainBanner/>
            <HomeCourses/>
            <HowMyCoursesWork/>
            <ReviewCourses/>
        </>
    );
}