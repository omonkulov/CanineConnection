import { atom } from "recoil";
import { defaultAuthState } from "../helpers/defaultValues";

/** State for keeping trakc of authentication of the user */
export const authState = atom({
  key: "auth",
  default: defaultAuthState,
});