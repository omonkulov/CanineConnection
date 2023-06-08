import React, { useEffect } from "react";
import { authState } from "../recoil/auth";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { API } from "../api/takehomeApi";
import Navbar from "./Navbar";

export default function Home() {
  const auth = useRecoilValue(authState);

  useEffect(() => {
    API.getDogBreeds((array) => {
      console.log(array);
    });
  }, []);

  if (!auth.loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar currentPagePath="/home"/> Home
    </div>
  );
}
