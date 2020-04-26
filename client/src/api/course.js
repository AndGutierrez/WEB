import { basePath, apiVersion } from './config';

export function getCoursesApi(req, res) {
    const url = `${basePath}/${apiVersion}/get-courses`;
    
    const params = {
        method: "GET",
        headers: {
            "content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;          
    });
}

export function getCourseDataUdemyApi(id) {
    const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;
    const courseParams = '?fields[course]=title,headline,url,price,image_480x270';

    const url = baseUrl + courseParams;

    return fetch(url)
    .then(async response => {
        return { code: response.status, data: await response.json() };
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function deleteCourseApi(token, id) {
    const url = `${basePath}/${apiVersion}/delete-course/${id}`;
    
    const params = {
        method: "DELETE",
        headers: {
            "content-Type": "application/json", 
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;          
    });
}

export function addCourseApi(token, course) {
    const url = `${basePath}/${apiVersion}/add-course`;
    
    const params = {
        method: "POST",
        headers: {
            "content-Type": "application/json", 
            Authorization: token
        },
        body: JSON.stringify(course)
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;          
    });
}

export function updateCourseApi(token, id, data) {
    const url = `${basePath}/${apiVersion}/update-course/${id}`;
    
    const params = {
        method: "PUT",
        headers: {
            "content-Type": "application/json", 
            Authorization: token
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;          
    });
}