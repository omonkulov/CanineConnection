import { atom } from "recoil";


interface authData {
    name: string,
    loggedIn: boolean,
    timeLoggedIn: string,
}

const defaultAtomValue: authData = {
    name: "",
    loggedIn: false,
    timeLoggedIn: ""
}

export const authState = atom({
    key: "auth",
    default: defaultAtomValue,
});