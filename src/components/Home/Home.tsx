import React, { useEffect, useState } from "react";
import { authState } from "../../recoil/auth";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { API } from "../../api/takehomeApi";
import Navbar from "../Navbar/Navbar";
import SearchComp from "./Search/SearchComp";
import { authExpiredHelper } from "../../helpers/helperFunctions";

/** Home page: where you search for dogs and add them to wishlist */
export default function Home() {
  const auth = useRecoilValue(authState);
  const [breeds, setBreeds] = useState([""]);

  /** 
   * Fetch all the dog breeds.
   * If fetching dog breeds fails that means user might be logged out.
   * In that case force the user log in. 
   */
  const fetchAllBreeds = async () => {
    const res = await API.getDogBreeds();
    res.status === "success" ? setBreeds(res.data) : authExpiredHelper();
  };

  useEffect(() => {
    if (!auth.loggedIn) return;
    fetchAllBreeds();
  }, [auth]);

  if (!auth.loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar currentPagePath="/home" />
      <SearchComp breeds={breeds} />
    </div>
  );
}
