import React, { useEffect, useState } from "react";
import { authExpiredHelper, authState } from "../recoil/auth";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { API } from "../api/takehomeApi";
import Navbar from "./Navbar";
import SearchComp from "./SearchComp";

export default function Home() {
  const auth = useRecoilValue(authState);
  const [breeds, setBreeds] = useState([""])

  useEffect(() => {
    API.getDogBreeds((array) => {
      setBreeds(array)
      console.log(array);
    });

    API.getDogIDsBySearch(
      {},
      (data) => {
        console.log(data);
      },
      (res) => {
        if (res.httpStatus === 401) authExpiredHelper();
      }
    );
  }, []);

  if (!auth.loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar currentPagePath="/home" />
      <SearchComp breeds={breeds}/>
    </div>
  );
}
