
type status = "failed" | "success" | "loading";

interface GenericApiResponse {
    status: status;
    httpStatus: number;
    message: string;
}

interface AuthLogin {
    email: string;
    name: string;
}

interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

interface Dog {
    id: string;
    img: string;
    name: String;
    age: number;
    zip_code: string;
    breed: string;
}
