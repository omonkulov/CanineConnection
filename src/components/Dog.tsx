import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dogState } from "../recoil/dogs";

interface DogProps {
  dog: Dog;
  onClick: (dog: Dog) => void;
}

export default function Dog(props: DogProps) {
  const wishtList = useRecoilValue(dogState.wishListState);
  const setWishList = useSetRecoilState(dogState.wishListState);
  return (
    <div style={{ height: "500px", width: "250px" }} className="rounded overflow-hidden shadow m-4 bg-gray-100 relative">
      <div className="">
        <img className="w-full object-cover h-64 w-64" src={props.dog.img} alt="Sunset in the mountains" />
      </div>
      <div className="px-3 py-2">
        <div className="font-bold text-xl mb-2">{props.dog.name}</div>
        {/* <p className="text-gray-700 text-base">{props.}</p> */}
      </div>
      <div className="px-3 pt-2 pb-2">
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"Age: " + props.dog.age}</p>
        <br />
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"ZipCode: " + props.dog.zip_code}</p>
        <br />
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"Breed: " + props.dog.breed}</p>
      </div>

      {wishtList && wishtList.find((dog) => dog.id === props.dog.id) ? (
        <button className="absolute rounded p-2 bottom-2 left-4  bg-red-500 text-white"onClick={() => setWishList((prev) => prev.filter((val) => val.id !== props.dog.id))}>
          Remove from List
        </button>
      ) : (
        <button className="absolute rounded p-2 bottom-2 left-4  bg-orange-500 text-white" onClick={() => setWishList((prev) => [...prev, props.dog])}>
          Add to list
        </button>
      )}
    </div>
  );
}
