const DOMAIN = "https://frontend-take-home-service.fetch.com"


/**
 * This api function will make a request to auth with the provided data. Then it will call one of the callback functions
 * with the response data. This function is as async.
 * @param data data required for auth: in this case email and name
 * @param callbackFailed callback function when the request fails
 * @param callbackSuccess callback function when the request is success
 */
async function login(data: AuthLogin, callbackFailed: (res:GenericApiResponse) => void, callbackSuccess: (res:GenericApiResponse) => void) {
    // Fetch config
    let url = DOMAIN + "/auth/login"
    let options:RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data),
    }

    // Fetch
    const response = await fetch(url, options);

    if (response.ok) {
        console.log("Logged in", response);
        // call the callback function with the data
        callbackFailed({status:"success", httpStatus: response.status,  message:""});
    } else {
        console.log("Failed to log in", response);
         // call the callback function with the data
        callbackSuccess({status:"failed", httpStatus: response.status, message: response.statusText});
    }
}

export const API = {
    login
}
