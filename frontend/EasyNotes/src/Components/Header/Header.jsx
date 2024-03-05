import React from "react";
import { Link,NavLink } from "react-router-dom";

export default function Header() {
  return (
      <header className="shadow sticky z-50 top-0">
          <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                  <Link to="/" className="flex items-center">
                      <img
                          src="https://imgs.search.brave.com/x7pQmFXXL1uujfRhQK1l0ZgxdUbhsPVed5iG_82_K_g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8x/MC8xNC8wOS81Ni9q/b3VybmFsLTI4NTAw/OTFfNjQwLmpwZw"
                          className="mr-3 h-12"
                          alt="Logo"
                      />
                  </Link>
                  <div className="flex items-center lg:order-2">
                      
                      <Link
                          to="/dashboard"
                          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                      >
                          Get started
                      </Link>
                  </div>
                  <div
                      className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                      id="mobile-menu-2"
                  >
                      <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                          <li>
                              <NavLink to={"/"}
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ?"text-orange-700":"text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Home
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to={"/login"}
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ?"text-orange-700":"text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Login
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to={"/register"}
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ?"text-orange-700":"text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Register
                              </NavLink>
                          </li>
                          <li>
                              <NavLink to={"/dashboard"}
                                  className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ?"text-orange-700":"text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                  }
                              >
                                  Dashboard
                              </NavLink>
                          </li>
                          
                          
                      </ul>
                  </div>
              </div>
          </nav>
      </header>
  );
}

