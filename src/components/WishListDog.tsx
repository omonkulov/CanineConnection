import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

interface WishListDogProp {
  removeFromWishList: (index: string) => void;
  dog: Dog
}

export default function WishtListDog(props: WishListDogProp) {
  return (
    <div style={{width:'200px', height:'350px', minWidth:'200px', minHeight:'350px'}} className="relative shadow-md  rounded-lg m-2">
      <img className="w-full h-56" src={props.dog.img} alt={props.dog.name} />
      <div className="px-4 py-2">
        <h2 className="font-bold text-lg">{props.dog.name}</h2>
        <p className="text-sm text-gray-700">{props.dog.breed}</p>
        <p className="text-sm text-gray-700">{props.dog.age} years old</p>
      </div>
      <button className="h-6 w-6 rounded-full bg-red-500 absolute -top-2 -right-2" onClick={() => props.removeFromWishList(props.dog.id)}>
        <XMarkIcon className="w-full h-full fill-white"/>
      </button>
    </div>
  );
}
