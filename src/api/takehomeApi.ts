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
    console.log("Logged in", response);
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
  return response.ok
}

async function getDogBreeds(callbackSuccess: (res: Array<string>) => void, callbackFailed?: (res: GenericApiResponse) => void) {
  // Fetch config
  let url = DOMAIN + "/dogs/breeds";
  let options: RequestInit = {
    credentials: "include",
  };

  // Fetch
  const response = await fetch(url, options);

  if (response.ok) {
    let content = await response.text();
    let array = JSON.parse(content);
    // call the callback function with the data
    callbackSuccess(array);
  } else {
    console.log("Failed to log in", response);
    // call the callback function with the data
    if (callbackFailed) callbackFailed({ status: "failed", httpStatus: response.status, message: response.statusText });
  }
}

async function getDogIDsBySearch(data: SearchRequestModal, callbackSuccess: (res: SearchResponseDataModel) => void, callbackFailed?: (res: GenericApiResponse) => void) {
  // Fetch config
  let url = DOMAIN + "/dogs/search";
  let options: RequestInit = {
    credentials: "include",
  };

  const isDataEmpty = Object.keys(data).length === 0;

  console.log("Filters: ", data);
  if (!isDataEmpty) {
    let params = new URLSearchParams();

    if (data.breeds) {
      data.breeds.forEach((val) => {
        params.append("breeds", val);
      });
    }
    if (data.zipCodes) {
      data.zipCodes.forEach((val) => {
        params.append("zipCodes", val);
      });
    }
    if (data.ageMin) {
      params.append("ageMin", data.ageMin + "");
    }
    if (data.ageMax) {
      params.append("ageMax", data.ageMax + "");
    }
    if (data.size) {
      params.append("size", data.size + "");
    }
    if (data.from) {
      params.append("from", data.from + "");
    }
    if (data.sort) {
      params.append("sort", "name:" + data.sort);
    }

    url += "?" + params.toString();
  }

  // Fetch
  const response = await fetch(url, options);

  if (response.ok) {
    let content = await response.text();
    let parsedObj = <SearchResponseData>JSON.parse(content);

    let res: SearchResponseDataModel = {
      httpStatus: response.status,
      message: response.statusText,
      next: getFromAndSizeFromURL(parsedObj.next),
      prev: getFromAndSizeFromURL(parsedObj.prev),
      resultIds: parsedObj.resultIds,
      status: "success",
      total: parsedObj.total,
    };
    // call the callback function with the data
    callbackSuccess(res);
  } else {
    console.log("Failed to log in", response.json());
    // call the callback function with the data
    if (callbackFailed) callbackFailed({ status: "failed", httpStatus: response.status, message: response.statusText });
  }
}

async function getDogObjectsFromIDs(data: Array<string>, callbackSuccess: (res: Array<Dog>) => void, callbackFailed?: (res: GenericApiResponse) => void) {
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
    // call the callback function with the data
    let content = await response.text();
    let array = JSON.parse(content);
    callbackSuccess(array);
  } else {
    console.log("Failed to log in", response);
    // call the callback function with the data
    if (callbackFailed) callbackFailed({ status: "failed", httpStatus: response.status, message: response.statusText });
  }
}

interface Match {
  match: string;
}
async function matchADogFromIDs(data: Array<string>): Promise<Match> {
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

async function getLocationObjectsFromIDs(data: Array<string>, callbackSuccess: (res: Array<Location>) => void, callbackFailed?: (res: GenericApiResponse) => void) {
  // Fetch config
  let url = DOMAIN + "/locations";
  let options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };

  // Fetch
  const response = await fetch(url, options);

  if (response.ok) {
    // call the callback function with the data
    let content = await response.text();
    let array = JSON.parse(content);
    callbackSuccess(array);
  } else {
    console.log("Failed to log in", response);
    // call the callback function with the data
    if (callbackFailed) callbackFailed({ status: "failed", httpStatus: response.status, message: response.statusText });
  }
}

async function matchDogsAndGetLocation(data: Array<Dog>): Promise<MatchDogsModel> {
  let dogsIDs = data.map((dog) => dog.id);
  let matchedID = await matchADogFromIDs(dogsIDs);
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

/**
 * The api returns for pagination "next":"/dogs/search?size=25&from=25". This functions parses the 'size' and 'from' into an object.
 * Then we can use that to manipulate the nubmers results per page
 * @param string next or prev ex: "/dogs/search?size=25&from=25"
 * @returns from: number and size: number in object
 */
function getFromAndSizeFromURL(params: string): { from: number; size: number } | undefined {
  if (params) {
    const urlParams = new URLSearchParams(params.split("?")[1]);
    let sizeStr = urlParams.get("size");
    let fromStr = urlParams.get("from");
    if (sizeStr && sizeStr.length > 0 && fromStr && fromStr.length > 0) {
      let size = Number(urlParams.get("size"));
      const from = Number(urlParams.get("from"));
      return { from, size };
    }
  }
  return undefined;
}

export const API = {
  login,
  logout,
  authCheck,

  getDogBreeds,
  getDogIDsBySearch,
  getDogObjectsFromIDs,

  matchADogFromIDs,
  getLocationObjectsFromIDs,
  matchDogsAndGetLocation,
};
