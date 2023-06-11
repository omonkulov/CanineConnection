import { atom } from "recoil";
import { defaultMatchListState, defaultWishListState } from "../helpers/defaultValues";

/** State for keeping track of all the dogs that are added to wishlist. */
const wishListState = atom({
  key: "withlist",
  default: defaultWishListState,
});

/** State for keeping track of all the dogs that "matched" with the user */
const matchListState = atom({
  key: "matchlist",
  default: defaultMatchListState,
});

export const dogState = { wishListState, matchListState };
