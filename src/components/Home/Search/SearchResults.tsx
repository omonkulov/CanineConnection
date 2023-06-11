import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { API } from "../../../api/takehomeApi";
import DogCard from "./DogCard";
import Pagination from "./Pagination";
import { authExpiredHelper } from "../../../helpers/helperFunctions";

interface ResultsProps {
  minAge: number;
  maxAge: number;
  breeds: Array<string>;
  zipCodes: Array<string>;
  shouldRefetch: boolean;
  sort: "asc" | "desc";
  setShouldRefetch: Dispatch<SetStateAction<boolean>>;
}

interface PageState {
  prevPage: { from: number; size: number } | undefined;
  nextPage: { from: number; size: number } | undefined;
  totalPages: number | undefined;
  size: number;
}

/** Used for displaying results and pagination */
export default function SearchResults(props: ResultsProps) {
  const [dogs, setdogs] = useState(Array<Dog>);
  const [page, setPage] = useState<PageState>({
    prevPage: undefined,
    nextPage: undefined,
    totalPages: undefined,
    size: 25,
  });

  const searchDogs = useCallback(
    async (from?: number, size?: number) => {
      let requestModel: SearchRequestModal = {
        breeds: props.breeds.length > 0 ? props.breeds : undefined,
        ageMin: props.minAge > -1 ? props.minAge : undefined,
        ageMax: props.maxAge > 0 ? props.maxAge : undefined,
        zipCodes: props.zipCodes.length > 0 ? props.zipCodes : undefined,
        from: from,
        size: size,
        sort: props.sort,
      };

      // Search dogs with given filter. Should return array of found dog ids
      let searchedDogs = await API.searchDogs(requestModel);
      setPage((prevPage) => {
        return {
          prevPage: searchedDogs.prev,
          nextPage: searchedDogs.next,
          size: 25,
          totalPages: Math.round(searchedDogs.total / prevPage.size),
        };
      });

      if (searchedDogs.httpStatus === 401) authExpiredHelper();

      // Converting those IDs to an actual dog objects
      let dogObjs = await API.getDogObjects(searchedDogs.resultIds);

      if (dogObjs.httpStatus === 401) authExpiredHelper();

      setdogs(dogObjs.data);
    },
    [props]
  );
   
  useEffect(() => {
    if (props.shouldRefetch) {
      searchDogs();
      props.setShouldRefetch(false);
    }
  }, [props, searchDogs]);

  if (!dogs || dogs.length <= 0) {
    return <p className="w-full text-center text-gray-500">Could not find results with that filter combination.</p>;
  }
  return (
    <div className="w-full flex flex-wrap justify-center">
      <div>
        <Pagination
          goToNextPage={() => searchDogs(page.nextPage?.from, page.nextPage?.size)}
          goToPrevPage={() => searchDogs(page.prevPage?.from, page.prevPage?.size)}
          currentPage={page.nextPage ? page.nextPage?.from / page.nextPage.size : undefined}
        />
      </div>
      <div className="w-full flex flex-wrap justify-center">
        {dogs.map((dog, key) => (
          <DogCard dog={dog} key={key} onClick={(dog) => console.log(dog)} />
        ))}
      </div>
    </div>
  );
}
