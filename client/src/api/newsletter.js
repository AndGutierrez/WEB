import { basePath, apiVersion } from './config';

export function suscribeNewsletterApi(email) {
    const url = `${basePath}/${apiVersion}/subscribe-newsletter/${email.toLowerCase()}`;

    const params = {
        method: "POST",
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
