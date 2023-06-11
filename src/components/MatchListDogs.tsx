import React from "react";

interface MachListDogProp {
  dog: Dog | undefined;
  location: LocationDog | undefined;
}

export default function MatchListDog(props: MachListDogProp) {
  if (!props || !props.dog || !props.location) return null;
  return (
    <div style={{ width: "260px", height: "450px", minWidth: "260px", minHeight: "450px" }} className={"goldCard goldCardShadow flex flex-col overflow-hidden rounded-lg m-2 transform rotate-3"}>
      <img className="w-full h-56 object-cover" src={props.dog.img} alt={props.dog.name} />
      <div className="px-4 py-2">
        <h2 className="font-bold text-white text-lg">{props.dog.name}</h2>
        <p className="text-sm text-white">{props.dog.breed}</p>
        <p className="text-sm text-white">{props.dog.age} years old</p>
      </div>
      <hr className="mx-4 border-1 border-black" />
      <div className="grow px-4 py-2">
        <h3 className="text-sm font-semibold text-white">Location</h3>
        <p className="text-sm text-white">
          {props.location.city} {props.location.state}
        </p>
        <p className="text-sm text-white">{props.location.county}</p>
        <p className="text-sm text-white">Zip: {props.location.zip_code}</p>
        <p className="text-sm text-white">
          Lat: {props.location.latitude}, Lon: {props.location.longitude}
        </p>
      </div>
    </div>
  );
}
