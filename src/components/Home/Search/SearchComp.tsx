import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import Badge from "../../Badge";
import SearchResults from "./SearchResults";
import Pagination from "../../Pagination";

const sortOptions: Array<{ name: string; val: "asc" | "desc" }> = [
  { name: "Acending", val: "asc" },
  { name: "Decending", val: "desc" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SearchCompProps {
  breeds?: Array<string>;
}

export default function SearchComp({ breeds }: SearchCompProps) {
  const [openFilters, setopenFilters] = useState(false);
  const [breedOptions, setBreedOptions] = useState(Array<string>);
  const [zipCodes, setZipcodes] = useState(Array<string>);
  const [minAge, setMinAge] = useState(-1);
  const [maxAge, setMaxAge] = useState(-1);
  const [zipCode, setZipCode] = useState("");
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [sort, setSort] = useState<"asc"| "desc">("asc");

  const filters = [
    {
      id: "breed",
      name: "Breed",
      options: breeds ?? [""],
    },
    {
      id: "zipcode",
      name: "ZipCodes",
      options: zipCodes ?? [""],
    },
  ];

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-8">
            <h1 className="text-lg font-bold tracking-tight text-gray-90 lg:text-4xl">Search</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {() => (
                            <p
                              onClick={() => setSort(option.val)}
                              className={classNames(option.val === sort ? "font-medium text-gray-900" : "text-gray-500", option.val === sort ? "bg-gray-100" : "", "block px-4 py-2 text-sm")}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="ml-2 p-2 rounded text-gray-500"
                onClick={() => {
                  setBreedOptions([]);
                  setZipcodes([]);
                  setZipCode("");
                  setMinAge(-1);
                  setMaxAge(-1);
                }}
              >
                <span className="">Clear Filter</span>
              </button>

              <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" onClick={() => setopenFilters((prev) => !prev)}>
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className={` ${openFilters ? "" : "hidden"} lg:block`}>
                <button type="button" className="w-full p-2 bg-orange-500 rounded text-white" onClick={() => setShouldRefetch(true)}>
                  <span className="">Update Results</span>
                </button>
                <h2 className="pl-5 pt-3 text-gray-600">Age</h2>
                <div className="inline-flex items-center mb-5 mt-2">
                  <div className="mx-5">
                    <input
                      id="min"
                      name="min"
                      type="number"
                      placeholder="Min"
                      onChange={(e) => setMinAge(Number(e.target.value))}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="w-6 h-1 bg-gray-300" />

                  <div className="mx-5 w-full inline-flex items-center">
                    <input
                      id="max"
                      name="max"
                      type="number"
                      placeholder="Max"
                      onChange={(e) => setMaxAge(Number(e.target.value))}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <h2 className="pl-5 pt-3 text-gray-600">Zip Code</h2>
                <div className="mx-4 inline-flex items-center mb-5 mt-2">
                  <div className="w-fill mr-5">
                    <input
                      id="zipcode"
                      name="zipcode"
                      type="text"
                      placeholder="15394"
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-16 p-2 bg-orange-500 rounded text-md text-white"
                    onClick={() => {
                      if (zipCode.length < 1) return;
                      setZipcodes((prev) => [...prev, zipCode]);
                      setZipCode("");
                    }}
                  >
                    <span className="">Add</span>
                  </button>
                </div>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name} {section.name === "Breed" && breedOptions.length > 0 ? <b>*</b> : section.name === "ZipCodes" && zipCodes.length > 0 ? <b>*</b> : null}
                            </span>
                            <span className="ml-6 flex items-center">{open ? <MinusIcon className="h-5 w-5" aria-hidden="true" /> : <PlusIcon className="h-5 w-5" aria-hidden="true" />}</span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel style={{ height: "50vh" }} className="pt-6 overflow-y-auto">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option} className="flex items-center">
                                {section.name === "Breed" ? (
                                  <Badge
                                    key={optionIdx}
                                    selected={breedOptions.includes(option)}
                                    message={option}
                                    callback={(data, selected) => {
                                      if (!selected) {
                                        setBreedOptions((prev) => [...prev, data]);
                                      } else {
                                        setBreedOptions((prev) => prev.filter((ele) => ele !== data));
                                      }
                                    }}
                                  />
                                ) : (
                                  <Badge
                                    key={optionIdx}
                                    selected={true}
                                    message={option}
                                    callback={(data, selected) => {
                                      setZipcodes((prev) => prev.filter((ele) => ele !== data));
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
              {/* Product grid */}
              <div className="col-span-3 flex flex-col justify-center">
                <SearchResults breeds={breedOptions} zipCodes={zipCodes} minAge={minAge} maxAge={maxAge} shouldRefetch={shouldRefetch} setShouldRefetch={setShouldRefetch} sort={sort} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
