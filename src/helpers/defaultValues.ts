/** Default wishlist dogs state */
const defaultWishListState: Array<Dog> = [];

/** Default matched dogs state */
let defaultMatchListState: Array<MatchDogsModel> = [
  {
    location: undefined,
    dog: undefined,
  },
];

/** Default auth state; used for setting it to default when something goes wrong to indane the user is not logged in */
const defaultAuthState: authData = {
  name: "",
  loggedIn: false,
  timeLoggedIn: -1,
};

/** Interval to do session check: 45min */
const expirationTime = 3300000;

export { defaultWishListState, defaultMatchListState, defaultAuthState, expirationTime };
