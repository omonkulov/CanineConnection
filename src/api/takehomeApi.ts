const DOMAIN = "https://frontend-take-home-service.fetch.com"


/**
 * This api function will make a request to auth with the provided data. Then it will call one of the callback functions
 * with the response data. This function is as async.
 * @param data data required for auth: in this case email and name
 * @param callbackSuccess callback function when the request is success
 * @param callbackFailed callback function when the request fails
 */
async function login(data: AuthLogin, callbackSuccess: (res:AuthDataResponse) => void, callbackFailed?: (res:GenericApiResponse) => void) {
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
        callbackSuccess(authData);
        // Set Local storage to persist 
        localStorage.setItem("auth", JSON.stringify(authData))
    } else {
        console.log("Failed to log in", response);
         // call the callback function with the data
        if (callbackFailed) callbackFailed({status:"failed", httpStatus: response.status, message: response.statusText});
    }
}



/**
 * This api function will make a request to proected path to see if user is still still logged in has valid cookie. Then it will the callback functions
 * with a boolean param. This function is as async. This function should be used rarely. 
 * @param callback callback function when the request fails

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


async function getDogBreeds(callbackSuccess: (res:Array<string>) => void, callbackFailed?: (res:GenericApiResponse) => void) {
    // Fetch config
    let url = DOMAIN + "/dogs/breeds"
    let options:RequestInit = {
        credentials: 'include',
    }

    // Fetch
    const response = await fetch(url, options);
    let content = await response.text();
    let array = JSON.parse(content)

    if (response.ok && response) {
        // call the callback function with the data
        callbackSuccess(array);
    } else {
        console.log("Failed to log in", response);
         // call the callback function with the data
        if (callbackFailed) callbackFailed({status:"failed", httpStatus: response.status, message: response.statusText});
    }
}

export const API = {
    login,
    authCheck,

    getDogBreeds
}
