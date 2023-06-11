import { atom } from "recoil";

const test: Array<Dog> = []
const wishListState = atom({
  key: "withlist",
  default: test,
});


let defaultMatchList: Array<MatchDogsModel> = [{
  location: undefined,
  dog: undefined,
}]
const matchListState = atom({
  key: "matchlist",
  default: defaultMatchList,
});

export const dogState = { wishListState, matchListState };
