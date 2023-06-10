import { atom } from "recoil";



const defaultAuthState: authData = {
    name: "",
    loggedIn: false,
    timeLoggedIn: -1
}

export const authState = atom({
    key: "auth",
    default: defaultAuthState,
});

/**
 * Use this when an API request returns 401 (Permission denied) and you are sure you have access to that end point.
 * This is way to detect if the cookie has expiered. This is just a workaround to make it work in the quickes time.
 */
function authExpiredHelper(){
    localStorage.removeItem("auth");
    window.location.reload();
}

export {defaultAuthState, authExpiredHelper}