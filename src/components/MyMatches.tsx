import React from "react";
import Navbar from "./Navbar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dogState } from "../recoil/dogs";
import WishtListDog from "./WishListDog";
import MatchListDog from "./MatchListDogs";
import { API } from "../api/takehomeApi";
import { authState } from "../recoil/auth";
import { Navigate } from "react-router-dom";

export default function MyMatches() {
  const wishList = useRecoilValue(dogState.wishListState);
  const setWishList = useSetRecoilState(dogState.wishListState);
  const matchList = useRecoilValue(dogState.matchListState);
  const setMatchList = useSetRecoilState(dogState.matchListState);
  const auth = useRecoilValue(authState);

  const removeFromWishList = (id: string) => {
    setWishList((prev) => prev.filter((dog) => dog.id !== id));
  };

  const handleSubmit = async () => {
    let matchedDogObj = await API.matchDogsAndGetLocation(wishList);
    console.log(matchedDogObj);
    setMatchList((prev) => [...prev, matchedDogObj]);
    setWishList([]);
  };

  if (!auth.loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-full w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar currentPagePath="/matches" />
      <div className="flex flex-col grow">
        <div className="flex flex-col px-4 my-3" style={{ minHeight: "382px" }}>
          <h2 className="sm:text-2xl tracking-tight text-gray-900 my-3"> Dogs I would like to match with.... </h2>
          <div className="inline-flex overflow-x-auto py-2">
            {wishList.map((dog, key) => (
              <WishtListDog key={key} dog={dog} removeFromWishList={removeFromWishList} />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <hr className="grow mx-2" />
          <button className="grow-0 bg-orange-600 w-24 p-2 rounded text-white disabled:bg-gray-300" disabled={wishList.length <= 0} onClick={handleSubmit}>
            Submit
          </button>
          <hr className="grow mx-2" />
        </div>

        <div className="flex flex-col px-4 my-3" style={{ minHeight: "400px" }}>
          <h2 className="sm:text-2xl tracking-tight text-gray-900 my-3"> Matched friends: </h2>
          <div className="inline-flex overflow-x-auto py-2 pl-8">
            {matchList.map((dog, key) => (
              <MatchListDog key={key} dog={dog.dog} location={dog.location} />
            ))}
          </div>
        </div>
        {matchList.length > 0 && (
          <div className="flex items-center justify-center">
            <p className="text-xs tracking-tight w-auto text-white mb-1 p-2 bg-gray-400 rounded cursor-pointer" onClick={() => setMatchList([])}>
              Clear Match List
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
