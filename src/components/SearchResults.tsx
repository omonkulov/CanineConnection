import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { API } from "../api/takehomeApi";
import Dog from "./Dog";
import { authExpiredHelper } from "../recoil/auth";

interface ResultsProps {
  minAge: number;
  maxAge: number;
  breeds: Array<string>;
  zipCodes: Array<string>;
  shouldRefetch: boolean;
  setShouldRefetch: Dispatch<SetStateAction<boolean>>;
}
export default function SearchResults(props: ResultsProps) {
  const [dogs, setdogs] = useState(Array<Dog>);
  const [hasError, setError] = useState(false);

  function searchDogs() {
    let requestModel: SearchRequestModal = {
      breeds: props.breeds.length > 0 ? props.breeds : undefined,
      ageMin: props.minAge > -1 ? props.minAge : undefined,
      ageMax: props.maxAge > 0 ? props.minAge : undefined,
      zipCodes: props.zipCodes.length > 0 ? props.zipCodes : undefined,
    };

    API.getDogIDsBySearch(
      requestModel,
      (data) => {
        API.getDogObjectsFromIDs(
          data.resultIds,
          (data) => {
            setdogs(data);
          },
          (res) => {
            if (res.httpStatus === 401) authExpiredHelper();
          }
        );
        //Success
        console.log(data.resultIds);
      },
      (res) => {
        if (res.httpStatus === 401) authExpiredHelper();
      }
    );
  }

  useEffect(() => {
    if (props.shouldRefetch) {
      searchDogs();
      props.setShouldRefetch(false);
    }
  }, [props]);

  if (!dogs || dogs.length <= 0) {
    return <p className="w-full text-center text-gray-500">Could not find results with that fitler combination.</p>;
  }
  return (
    <>
      {dogs.map((dog, key) => (
        <Dog dog={dog} key={key} onClick={(dog) => console.log(dog)} />
      ))}
    </>
  );
}
