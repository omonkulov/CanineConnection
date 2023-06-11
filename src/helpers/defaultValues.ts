const defaultWishListState: Array<Dog> = [];

let defaultMatchListState: Array<MatchDogsModel> = [
  {
    location: undefined,
    dog: undefined,
  },
];

const defaultAuthState: authData = {
  name: "",
  loggedIn: false,
  timeLoggedIn: -1,
};

/** Interval to do session check: 45min */
const expirationTime = 3300000;
export { defaultWishListState, defaultMatchListState, defaultAuthState, expirationTime };
