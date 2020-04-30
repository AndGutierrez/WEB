import { basePath, apiVersion } from './config';


export function getBlogsApi(page, limit) {
    const url = `${basePath}/${apiVersion}/get-blogs?page=${page}&limit=${limit}`;

    return fetch(url)
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

export function deleteBlogApi(token, id) {
    const url = `${basePath}/${apiVersion}/delete-blog/${id}`;
    
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

export function addBlogApi(token, blogData) {
    const url = `${basePath}/${apiVersion}/add-blog`;
    
    const params = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(blogData),
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

// export function updateBlogApi(token, blogId, blogData) {
//     const url = `${basePath}/${apiVersion}/update-blog/${blogId}`;

//     const params = {
//         method: "PUT",
//         headers: {
//             "content-Type": "application/json",
//             Authorization: token
//         },
//         body: JSON.stringify(blogData),
//     };

//     return fetch(url, params)
//         .then(response => {
//             return response.json();
//         })
//         .then(result => {
//             return result.message;
//         })
//         .catch(err => {
//             return err.message;          
//         });
// }

// export function deleteBlogApi(token, blogId) {
//     const url = `${basePath}/${apiVersion}/delete-blog/${blogId}`;

//     const params = {
//         method: "DELETE",
//         headers: {
//             "content-Type": "application/json",
//             Authorization: token
//         },
//     };

//     return fetch(url, params)
//         .then(response => {
//             return response.json();
//         })
//         .then(result => { 
//             return result.message;
//         })
//         .catch(err => {
//             return err.message;          
//         });
// }