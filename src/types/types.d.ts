/** Status of api response. Used for indicating the status of the api requests. */
type status = "failed" | "success" | "loading";

/**
 * Typescript interface for generic response from the API request.
 * Used for callback to indicate how the request went. */
interface GenericApiResponse {
  status: status;
  httpStatus: number;
  message: string;
}

//#region auth
/** Typescript interface for required data for signing in */
interface AuthLogin {
  email: string;
  name: string;
}

/**
 * Typescript interface for login state. This is used for state in recoil.
 * We don't keep the email because that is basically the password in that case.
 */
interface authData {
  name: string;
  loggedIn: boolean;
  timeLoggedIn: number;
}

/**
 * Typescript interface for response data from requesting to API for auth.
 * Used for when the auth is successful.
 */
interface AuthDataResponse extends GenericApiResponse {
  authData: authData;
}
//#endregion

//#region search
/** Typescript interface for response data from rquest to /dogs/search */
interface SearchResponseData {
  resultIds: [string];
  total: number;
  next: string;
  prev: string;
}

interface SearchResponseDataModel extends GenericApiResponse {
  next: { size: number; from: number } | undefined;
  prev: { size: number; from: number } | undefined;
  resultIds: [string];
  total: number;
}

interface SearchRequestModal {
  breeds?: [string];
  zipCodes?: [string];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: "asc" | "desc";
}

interface PaginationState {
  next: { size: number; from: number };
  prev: { size: number; from: number };
  totalResults: number;
  currentPage: number;
  totalPages: number;
  firtPage: 0;
  lastPage: number;
}
//#region

//#region models
/**  Typescript interface for the Location objects returned by the API */
interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

/** Typescript interface for the Dog objects returned by our API */
interface Dog {
  id: string;
  img: string;
  name: String;
  age: number;
  zip_code: string;
  breed: string;
}
//#endregion
