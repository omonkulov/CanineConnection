import React from "react";

interface DogProps {
  dog: Dog
  onClick: (dog: Dog) => void;
}

export default function Dog(props: DogProps) {
  return (
    <div className="rounded overflow-hidden shadow m-4 bg-gray-100" onClick={() => props.onClick(props.dog)}>
      <div className="">
        <img className="w-full object-cover h-64 w-64" src={props.dog.img} alt="Sunset in the mountains" />
      </div>
      <div className="px-3 py-2">
        <div className="font-bold text-xl mb-2">{props.dog.name}</div>
        {/* <p className="text-gray-700 text-base">{props.}</p> */}
      </div>
      <div className="px-3 pt-2 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"Age: " + props.dog.age}</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"ZipCode: " + props.dog.zip_code}</span>
      </div>
      <button className="rounded p-2 m-3 inline block bg-orange-500 text-white" onClick={() => props.onClick(props.dog)}>
        Add to list
      </button>
    </div>
  );
}
