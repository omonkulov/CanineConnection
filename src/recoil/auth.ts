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


export {defaultAuthState}