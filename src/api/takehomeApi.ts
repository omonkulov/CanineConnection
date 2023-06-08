const DOMAIN = "https://frontend-take-home-service.fetch.com"


/**
 * This api function will make a request to auth with the provided data. Then it will call one of the callback functions
 * with the response data. This function is as async.
 * @param data data required for auth: in this case email and name
 * @param callbackFailed callback function when the request fails
 * @param callbackSuccess callback function when the request is success
 */
async function login(data: AuthLogin, callbackFailed: (res:AuthDataResponse) => void, callbackSuccess: (res:GenericApiResponse) => void) {
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
        const authData: AuthDataResponse = {
            status: "success",
            httpStatus: response.status,
            message: "",
            authData: {
                loggedIn: true,
                name: data.name,
                timeLoggedIn: Date.now()
            }
        }
        // call the callback function with the data
        callbackFailed(authData);
        // Set Local storage to persist 
        localStorage.setItem("auth", JSON.stringify(authData))
    } else {
        console.log("Failed to log in", response);
         // call the callback function with the data
        callbackSuccess({status:"failed", httpStatus: response.status, message: response.statusText});
    }
}



/**
 * This api function will make a request to proected path to see if user is still still logged in has valid cookie. Then it will the callback functions
 * with a boolean param. This function is as async. This function should be used rarely. 
 * @param callbackFailed callback function when the request fails

 */
async function authCheck(callback: (res:boolean) => void) {
    // Fetch config
    let url = DOMAIN
    let options:RequestInit = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    }

    // Fetch
    const response = await fetch(url, options);

    if (response.ok) {
        callback(true);
    } else {
        callback(false);
    }
}

export const API = {
    login,
    authCheck
}
