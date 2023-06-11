import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import PuppySvg from "./PuppySvg";
import { API } from "../api/takehomeApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../recoil/auth";
import { dogState } from "../recoil/dogs";
import { defaultAuthState } from "../helpers/defaultValues";
import { authExpiredHelper } from "../helpers/helperFunctions";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface NavbarProps {
  currentPagePath: string;
}
export default function Navbar({ currentPagePath }: NavbarProps) {
  let navigate = useNavigate();
  let auth = useRecoilValue(authState);
  let setAuth = useSetRecoilState(authState);
  let wishtList = useRecoilValue(dogState.wishListState);

  const navigation = [
    { name: "Home", to: "/home", current: currentPagePath === "/home" },
    { name: "My Matches", to: "/matches", current: currentPagePath === "/matches" },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-50">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div className="w-8 h-8">
                    <PuppySvg />
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <p
                        key={item.name}
                        onClick={() => navigate(item.to)}
                        className={classNames(item.current ? "bg-orange-600 text-white" : "text-gray-800 hover:bg-gray-700 hover:text-white", "relative rounded-md px-3 py-2 text-sm font-medium")}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                        {(item.to === "/matches" && wishtList.length > 0 && !item.current) && (
                          <>
                            <span className="absolute -right-1 -top-1 rounded-full h-4 w-4 bg-red-600 text-center text-white text-xs">{wishtList.length}</span>
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>{({ active }) => <p className={classNames("block px-4 py-2 text-sm text-gray-700")}>{auth.name}</p>}</Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                            onClick={() => {
                              API.logout();
                              setAuth(defaultAuthState);
                              authExpiredHelper();
                            }}
                          >
                            Sign out
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="p"
                  onClick={() => navigate(item.to)}
                  className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-700 hover:text-white", "relative block rounded-md px-3 py-2 text-base font-medium")}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                  {(item.to === "/matches" && wishtList.length > 0 && !item.current) && (
                    <>
                      <span className="absolute left-1 top-0 rounded-full h-4 w-4 bg-red-600 text-center text-white text-xs">{wishtList.length}</span>
                    </>
                  )}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
          <hr/>
        </>
      )}
    </Disclosure>
  );
}
