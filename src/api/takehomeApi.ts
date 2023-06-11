import { buildURLParam, getFromAndSizeFromURL } from "../helpers/helperFunctions";

const DOMAIN: string = process.env.REACT_APP_DOMAIN ?? "";

if (DOMAIN === "") {
  console.log("Failed to fetch domain from .env, found: ", DOMAIN);
}

/**
 * This api function will make a request to auth with the provided data. Then it will call one of the callback functions
 * with the response data. This function is as async.
 * @param data data required for auth: in this case email and name
 * @param callbackSuccess callback function when the request is success
 * @param callbackFailed callback function when the request fails
 */
async function login(data: AuthLogin): Promise<AuthDataResponse> {
  // Fetch config
  let url = DOMAIN + "/auth/login";
  let options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };

  // Fetch
  const response = await fetch(url, options);
  if (response.ok) {
    const authData: AuthDataResponse = {
      status: "success",
      httpStatus: response.status,
      message: "",
      authData: {
        loggedIn: true,
        name: data.name,
        timeLoggedIn: Date.now(),
      },
    };
    // Set Local storage to persist
    localStorage.setItem("auth", JSON.stringify(authData));
    return authData;
  }
  console.log("Failed to log in", response);
  return {
    status: "failed",
    httpStatus: response.status,
    message: response.statusText,
    authData: undefined,
  };
}

/**
 * This api function will make a request to log out the user.
 * This will invalidate the auth cookie.
 */
async function logout() {
  // Fetch config
  let url = DOMAIN + "/auth/logout";
  let options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  // Fetch
  await fetch(url, options);

  // Remove user from local storage
  localStorage.removeItem("auth");
}

/**
 * This api function will make a request to proected path to see if user is still still logged in has valid cookie. Then it will the callback functions
 * with a boolean param. This function is as async. This function should be used rarely.
 * @param callback callback function when the request fails
 */
async function authCheck(): Promise<boolean> {
  // Fetch config
  let url = DOMAIN;
  let options: RequestInit = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  // Fetch
  const response = await fetch(url, options);
  return response.ok;
}

/**
 * Fetch all the dog breed options for filters
 * @returns List of breed and request status
 */
async function getDogBreeds(): Promise<DogBreedsResponseModel> {
  // Fetch config
  let url = DOMAIN + "/dogs/breeds";
  let options: RequestInit = { credentials: "include" };

  // Fetch
  const response = await fetch(url, options);

  if (response.ok) {
    let content = await response.text();
    let array = JSON.parse(content);
    return {
      data: array,
      status: "success",
      httpStatus: response.status,
      message: response.statusText,
    };
  }

  return {
    data: [],
    status: "failed",
    httpStatus: response.status,
    message: response.statusText,
  };
}
/**
 * Search dogs using the given filter
 * @param data Filter data
 * @returns array of dog ids
 */
async function searchDogs(data: SearchRequestModal): Promise<SearchResponseDataModel> {
  // Fetch config
  let url = DOMAIN + "/dogs/search";
  let options: RequestInit = {
    credentials: "include",
  };

  const isFilterDataEmpty = Object.keys(data).length === 0;
  if (!isFilterDataEmpty) url += buildURLParam(data)

  // Fetch
  const response = await fetch(url, options);

  if (response.ok) {
    let content = await response.text();
    let parsedObj = JSON.parse(content) as SearchResponseData;
    let res: SearchResponseDataModel = {
      httpStatus: response.status,
      message: response.statusText,
      next: getFromAndSizeFromURL(parsedObj.next),
      prev: getFromAndSizeFromURL(parsedObj.prev),
      resultIds: parsedObj.resultIds,
      status: "success",
      total: parsedObj.total,
    };
    return res;
  }
  return {
    httpStatus: response.status,
    message: response.statusText,
    next: undefined,
    prev: undefined,
    resultIds: [],
    status: "failed",
    total: 0,
  };
}

/**
 * This will fetch all dog objects using the given array of dog ids
 * @param data Array of dog ids
 * @returns array of dog objects
 */
async function getDogObjects(data: Array<string>): Promise<GetDogObjectResponseModel> {
  // Fetch config
  let url = DOMAIN + "/dogs";
  let options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };

  // Fetch
  const response = await fetch(url, options);

  if (response.ok) {
    let content = await response.text();
    let array = JSON.parse(content);
    return {
      data: array,
      status: "success",
      httpStatus: response.status,
      message: response.statusText,
    };
  }
  return {
    data: [],
    status: "failed",
    httpStatus: response.status,
    message: response.statusText,
  };
}

/**
 * Match a single dog from the given array
 * @param data Array of Dog's ID
 * @returns a dog id that matched the user
 */
async function matchDog(data: Array<string>): Promise<Match> {
  // Fetch config
  let url = DOMAIN + "/dogs/match";
  let options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };

  // Fetch
  const response = await fetch(url, options);
  let content = await response.text();
  let match: Match = JSON.parse(content);

  return match;
}

/**
 * Fetchs to match a dog and fetchs the location of that matched dog
 * @param data array of dogs
 * @returns matched dog object with location information
 */
async function getMatchedDog(data: Array<Dog>): Promise<MatchDogsModel> {
  let dogsIDs = data.map((dog) => dog.id);
  let matchedID = await matchDog(dogsIDs);
  let matchedDogObj = data.find((dog) => dog.id === matchedID.match);

  // Fetch config
  let url = DOMAIN + "/locations";
  let options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify([matchedDogObj?.zip_code]),
  };

  const response = await fetch(url, options);

  if (response.ok) {
    let content = await response.text();
    let locationObj: LocationDog = JSON.parse(content)[0];
    console.log(locationObj);

    return {
      dog: data.find((dog) => dog.id === matchedID.match),
      location: locationObj,
    };
  }
  return {
    dog: undefined,
    location: undefined,
  };
}



export const API = {
  login,
  logout,
  authCheck,

  getDogBreeds,
  searchDogs,
  getDogObjects,

  matchDog,
  getMatchedDog,
};
