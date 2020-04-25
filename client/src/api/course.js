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