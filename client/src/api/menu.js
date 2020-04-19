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

export function updateMenuApi(token, menuId, menuData) {
    const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;

    const params = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(menuData),
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;          
        });
}

export function activateMenuApi(token, menuId, status) {
    const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;

    const params = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ active: status }),
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;          
        });
}