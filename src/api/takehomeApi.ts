const DOMAIN = "https://frontend-take-home-service.fetch.com";

/**
 * This api function will make a request to auth with the provided data. Then it will call one of the callback functions
 * with the response data. This function is as async.
 * @param data data required for auth: in this case email and name
 * @param callbackSuccess callback function when the request is success
 * @param callbackFailed callback function when the request fails
 */
async function login(data: AuthLogin, callbackSuccess: (res: AuthDataResponse) => void, callbackFailed?: (res: GenericApiResponse) => void) {
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
    // call the callback function with the data
    callbackSuccess(authData);
    // Set Local storage to persist
    localStorage.setItem("auth", JSON.stringify(authData));
  } else {
    console.log("Failed to log in", response);
    // call the callback function with the data
    if (callbackFailed) callbackFailed({ status: "failed", httpStatus: response.status, message: response.statusText });
  }
}

/**
 * This api function will make a request to proected path to see if user is still still logged in has valid cookie. Then it will the callback functions
 * with a boolean param. This function is as async. This function should be used rarely. 
 * @param callback callback function when the request fails

 */
async function authCheck(callback: (res: boolean) => void) {
  // Fetch config
  let url = DOMAIN;
  let options: RequestInit = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  // Fetch
  const response = await fetch(url, options);

  if (response.ok) {
    callback(true);
  } else {
    callback(false);
  }
}

async function getDogBreeds(callbackSuccess: (res: Array<string>) => void, callbackFailed?: (res: GenericApiResponse) => void) {
  // Fetch config
  let url = DOMAIN + "/dogs/breeds";
  let options: RequestInit = {
    credentials: "include",
  };

  // Fetch
  const response = await fetch(url, options);

  if (response.ok && response) {
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

  if (!isDataEmpty) {
    let params = new URLSearchParams();

    if (data.breeds) {
      params.append("breeds", JSON.stringify(data.breeds));
    }
    if (data.zipCodes) {
      params.append("zipCodes", JSON.stringify(data.zipCodes));
    }
    if (data.ageMin) {
      params.append("ageMin=", data.ageMin.toString());
    }
    if (data.ageMax) {
      params.append("ageMax=", data.ageMax.toString());
    }
    if (data.size) {
      params.append("size=", data.size.toString());
    }
    if (data.from) {
      params.append("from=", data.from.toString());
    }
    if (data.sort) {
      params.append("sort=", data.sort.toString());
    }

    url += "?" + params.toString();
  }

  // Fetch
  const response = await fetch(url, options);

  if (response.ok && response) {
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

async function getDogObjectsFromIDs(callbackSuccess: (res: Array<Dog>) => void, callbackFailed?: (res: GenericApiResponse) => void) {
  // Fetch config
  let url = DOMAIN + "/dogs/breeds";
  let options: RequestInit = {
    credentials: "include",
  };

  // Fetch
  const response = await fetch(url, options);
  let content = await response.text();
  let array = JSON.parse(content);

  if (response.ok && response) {
    // call the callback function with the data
    callbackSuccess(array);
  } else {
    console.log("Failed to log in", response);
    // call the callback function with the data
    if (callbackFailed) callbackFailed({ status: "failed", httpStatus: response.status, message: response.statusText });
  }
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
  authCheck,

  getDogBreeds,
  getDogIDsBySearch,
  getDogObjectsFromIDs,
};
