import React, { useEffect, useState } from "react";
import PuppySvg from "./PuppySvg";
import { API } from "../api/takehomeApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, defaultAuthState } from "../recoil/auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function LogIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);
  let navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleLoginSuccess = (data: AuthDataResponse) => {
    setFailed(false);
    setAuth(data.authData);
  };

  const handleLoginFail = (data: GenericApiResponse) => {
    setFailed(true);
    if (data.message && data.message.length > 0) {
      setErrorMessage("Failed to login. Error: " + data.message);
    } else {
      setErrorMessage("Failed to login. Please check your credintials.");
    }
  };

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(name, email);

    // Try to login
    if (name.length <= 0 || email.length <= 0) {
      setFailed(true);
      setErrorMessage("Failed to login. One of the fields are empty.");
    } else if (!isValidEmail(email)) {
      setFailed(true);
      setErrorMessage("Failed to login. Not a valid email.");
    } else {
      API.login(
        {
          email: email,
          name: name,
        },
        handleLoginSuccess,
        handleLoginFail
      );
    }
  };

  useEffect(() => {
    // If the user is already logged; skip
    if (auth.loggedIn) {
      return;
    }

    let data = localStorage.getItem("auth");

    // If there is nothing in local storage; skip
    if (!data) {
      return;
    }

    // Parse the local storage auth info and convert it into type
    let localAuth = JSON.parse(data) as unknown as AuthDataResponse;

    // If the data is valid then start copying the over the localstorage into auth state
    if (localAuth && localAuth.authData && localAuth.authData.loggedIn) {
      console.log("Found a valid auth instance in localstorage for ", localAuth.authData.name)
      // Check if the last time logged in not earlier than 3 hours
      let currentTime = Date.now();
      if (currentTime - localAuth.authData.timeLoggedIn < 10800000) {
        // Copy the valid and unexpired auth instance into the state and redirect the user to the home page
        console.log("Copying auth instance into the state...")
        setAuth(localAuth.authData);
        navigate("/home");
      } else {
        // It has been over 3 hours since last time logged in; check if the local storage auth is still valid
        console.log("3 hours passed since the last time logged in. Will check if cookie still valid")
        API.authCheck((res) => {
          if (res) {
            // It is valid; update the local storage time and copy it over to the state
            console.log("Cookie is valid, updating the time to ", currentTime)
            setAuth({ ...localAuth.authData, timeLoggedIn: currentTime });
            navigate("/home");
          } else {
            // The localstorage auth instance is not valid; user will need to login to continue
            console.log("Cookie is not valid and failed to reach protected path, user should sign in manually")
            setAuth(defaultAuthState);
          }
        });
      } 
    }
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
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
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
      {failed && (
        <p className="mt-10 text-center leading-9 tracking-tight text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
