import React from "react";
import { authState } from "../recoil/auth";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

export default function Home() {
  const auth = useRecoilValue(authState);

  if(!auth.loggedIn) {
    return <Navigate to="/login" />
  }
  
  return <div>Home</div>;
}
