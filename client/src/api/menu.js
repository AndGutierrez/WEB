import { basePath, apiVersion } from './config';

export function getMenusApi(token) {
    const url = `${basePath}/${apiVersion}/menus`;
    
    const params = {
        method: "GET",
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
            return err.message;          
        });
}