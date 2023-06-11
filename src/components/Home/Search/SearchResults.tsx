import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { API } from "../../../api/takehomeApi";
import Dog from "../../Dog";
import Pagination from "../../Pagination";
import { authExpiredHelper } from "../../../helpers/helperFunctions";

interface ResultsProps {
  minAge: number;
  maxAge: number;
  breeds: Array<string>;
  zipCodes: Array<string>;
  shouldRefetch: boolean;
  sort: "asc" | "desc"
  setShouldRefetch: Dispatch<SetStateAction<boolean>>;
}

interface PageState {
  prevPage: {from: number, size:number} | undefined;
  nextPage: {from: number, size:number} | undefined;
  totalPages: number | undefined;
  size: number;
}

const defaultPage : PageState = {
  prevPage:undefined,
  nextPage: undefined,
  totalPages: undefined,
  size: 25
}

export default function SearchResults(props: ResultsProps) {
  const [dogs, setdogs] = useState(Array<Dog>);
  const [page, setPage] = useState(defaultPage)
  const [hasError, setError] = useState(false);



  function searchDogs(from?: number, size?:number) {
    let requestModel: SearchRequestModal = {
      breeds: props.breeds.length > 0 ? props.breeds : undefined,
      ageMin: props.minAge > -1 ? props.minAge : undefined,
      ageMax: props.maxAge > 0 ? props.maxAge : undefined,
      zipCodes: props.zipCodes.length > 0 ? props.zipCodes : undefined,
      from: from,
      size: size,
      sort: props.sort
    };
    API.getDogIDsBySearch(
      requestModel,
      (ids) => {
        setPage((prevPage) => {
          return {
            prevPage: ids.prev,
            nextPage: ids.next,
            size: 25,
            totalPages: Math.round(ids.total / prevPage.size)
          }
        })
        API.getDogObjectsFromIDs(
          ids.resultIds,
          (data) => {
            setdogs(data);
          },
          (res) => {
            if (res.httpStatus === 401) authExpiredHelper();
          }
        );
        //Success
      },
      (res) => {
        if (res.httpStatus === 401) authExpiredHelper();
      }
    );
  }

  function goToNextPage(){
    searchDogs(page.nextPage?.from, page.nextPage?.size);
  }

  function goToPrevPage(){
    searchDogs(page.prevPage?.from, page.prevPage?.size);
    
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
    <div className="w-full flex flex-wrap justify-center">
      <div>
        <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} currentPage={page.nextPage ? page.nextPage?.from / page.nextPage.size : undefined} />
        
      </div>
      <div className="w-full flex flex-wrap justify-center">
        {dogs.map((dog, key) => (
          <Dog dog={dog} key={key} onClick={(dog) => console.log(dog)} />
        ))}
      </div>
    </div>
  );
}
