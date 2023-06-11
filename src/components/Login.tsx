import React, { useEffect, useState } from "react";
import PuppySvg from "./PuppySvg";
import { API } from "../api/takehomeApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../recoil/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { defaultAuthState, expirationTime } from "../helpers/defaultValues";
import { isValidEmail } from "../helpers/helperFunctions";

export default function LogIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);
  let navigate = useNavigate();

  /** Handles login request success; sets the auth state */
  const handleLoginSuccess = (data: AuthDataResponse) => {
    setFailed(false);
    setAuth(data.authData ?? defaultAuthState);
  };

  /** Handles login request failing; if there is an error message it will display it on the screen */
  const handleLoginFail = (data: GenericApiResponse) => {
    setFailed(true);
    if (data.message && data.message.length > 0) {
      setErrorMessage("Failed to login. Error: " + data.message);
    } else {
      setErrorMessage("Failed to login. Please check your credintials.");
    }
  };

  /** Handles sign in button being pressed */
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (name.length <= 0 || email.length <= 0) {
      setFailed(true);
      setErrorMessage("Failed to login. One of the fields are empty.");
    } else if (!isValidEmail(email)) {
      setFailed(true);
      setErrorMessage("Failed to login. Not a valid email.");
    } else {
      // Form passed validation; make a request
      const response = await API.login({ email, name });
      if (response.authData && response.status === "success") {
        handleLoginSuccess(response);
        return;
      }
      handleLoginFail(response);
    }
  };

  /**
   * Work-around to keep user logged in when page is refreshed.
   * This way we don't ping the server every time user refreshes the page.
   * @param data localstorage raw value
   */
  const recoverAuthState = async (data: string) => {
    // Parse the raw value info and convert it into type
    const localAuth = JSON.parse(data) as unknown as AuthDataResponse;
    if (localAuth && localAuth.authData && localAuth.authData.loggedIn) {
      // Valid date instance
      const currentTime = Date.now();
      const timePassed = currentTime - localAuth.authData.timeLoggedIn;
      if (timePassed < expirationTime) {
        // 45 min did not pass yet; instance is good
        setAuth(localAuth.authData);
        navigate("/home");
      } else {
        // 45 min did pass; need to check if session is still good
        if (await API.authCheck()) {
          // It is valid; update the local storage time and copy it over to the state
          setAuth({ ...localAuth.authData, timeLoggedIn: currentTime });
          navigate("/home");
        } else {
          // The localstorage auth instance is not valid; user will need to login to continue
          console.log("Cookie is not valid and failed to reach protected path, user should sign in manually");
          setAuth(defaultAuthState);
        }
      }
    }
  };

  useEffect(() => {
    // If the user is already logged; skip
    if (auth.loggedIn) return;

    // Check localstorage for any instance
    let data = localStorage.getItem("auth");
    // If there is nothing in local storage; skip
    if (!data) return;

    // User is not logged in but there is an auth instance in the localstorage
    recoverAuthState(data);
  }, [setAuth, auth.loggedIn, navigate]);

  if (auth.loggedIn) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-col justify-center align-center">
          <div className="h-14 flex justify-center align-center">
            <PuppySvg />
          </div>
        </div>
      </div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleSignIn(e)}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      {failed && <p className="mt-10 text-center leading-9 tracking-tight text-red-300">{errorMessage}</p>}
    </div>
  );
}
