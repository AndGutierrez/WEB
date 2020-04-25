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