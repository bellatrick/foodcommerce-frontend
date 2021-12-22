import { Fragment, useState, useContext } from "react";
import SearchInput from "./SearchInput";
import { Popover, Transition } from "@headlessui/react";
import { ShoppingCart, ExpandMore } from "@material-ui/icons";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Uk from "../assets/Uk.png";
import Nig from "../assets/Nigeria.png";
import logo from "../assets/blue.png";
import { useNavigate } from "react-router-dom";
import { Store } from "../context/store";
import {
  FETCH_CATEGORIES,
  FETCH_PRODUCTS_QUERY,
  FETCH_SHIPPING,
} from "../utils/Graphql";
import { useQuery } from "@apollo/react-hooks";

import { useEffect } from "react";
export default function Example() {
  const { loading: loadingCat, data: categoryData } =
    useQuery(FETCH_CATEGORIES);
  const [local, setLocal] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Category");
  const { data: shippingData } = useQuery(FETCH_SHIPPING);
  const { loading, data } = useQuery(FETCH_PRODUCTS_QUERY);

  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleToggleOpen = () => {
    setOpen(!open);
  };
  const handleToggleLocal = () => {
    setLocal(!local);
    dispatch({ type: "SET_LOCAL", payload: local });
  };
  const handleViewCart = () => {
    navigate("/cart");
  };
  const handleGoHome = () => {
    navigate("/");
  };
  const handleSearchProduct = (e) => {
    e.preventDefault();
    keyword.trim().length > 0 && navigate(`/search`);
  };

  useEffect(() => {
    if (shippingData) {
      dispatch({ type: "GET_SHIPPING", payload: shippingData.getShipping[0] });
    }
    if (categoryData) {
      dispatch({ type: "GET_CATEGORIES", payload: categoryData.getCategory });
      dispatch({ type: "CATEGORY_PREVIEW_LOADING", payload: loadingCat });
    }
    if (data) {
      dispatch({
        type: "GET_PRODUCT_LIST",
        payload: data.getAllProducts,
      });
      dispatch({ type: "PRODUCT_LIST_LOADING", payload: loading });
    }
  }, [dispatch, categoryData, data, loading, shippingData, loadingCat]);
  return (
    <>
      <Popover className="top-0 left-0 z-10 bg-secondary shadow sticky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
            <div
              onClick={handleGoHome}
              className="hidden md:flex justify-start lg:w-0 lg:flex-1"
            >
              <div>
                <span className="sr-only">Workflow</span>
                <img className="h-20 w-auto sm:h-20" src={logo} alt="" />
              </div>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-secondary rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-50 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:block">
              <SearchInput
                setCategory={setCategory}
                category={category}
                handleSearchProduct={handleSearchProduct}
                keyword={keyword}
                setKeyword={setKeyword}
              />
            </div>
            <div className=" cursor-pointer md:flex items-center justify-end md:flex-1 lg:w-0">
              <div
                className="relative hidden md:block"
                onClick={handleToggleOpen}
              >
                {local ? (
                  <div className="flex flex-col items-center align-middle mr-10">
                    <div className="text-sm text-white flex items-center ">
                      {" "}
                      <img src={Nig} alt="flag" />
                      <span className="text-sm w-16">
                        <ExpandMore />
                      </span>
                    </div>
                    <p className=" text-white text-sm mr-4">Shop In Nigeria</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center align-middle mr-10">
                    <div className="text-sm text-white flex items-center ">
                      {" "}
                      <img src={Uk} alt="flag" />
                      <span className="text-sm w-16">
                        <ExpandMore />
                      </span>
                    </div>
                    <p className=" text-white text-sm mr-10">Shop In UK</p>
                  </div>
                )}
                {open ? (
                  <div
                    className="z-10 w-48 absolute top-10 -left-10 p-3 rounded-2xl bg-white border border-primary"
                    onClick={() => setOpen(false)}
                  >
                    {!local ? (
                      <div
                        onClick={handleToggleLocal}
                        className="flex cursor-pointer items-center"
                      >
                        <img src={Nig} alt="flag" />

                        <p className="text-sm ml-3 font-bold">
                          Shop In Nigeria
                        </p>
                      </div>
                    ) : (
                      <div
                        onClick={handleToggleLocal}
                        className="flex cursor-pointer items-center"
                      >
                        <img src={Uk} alt="flag" />

                        <p className="text-sm ml-3 font-bold">Shop In UK</p>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={handleViewCart}
                className="flex cursor-pointer items-center"
              >
                <div className="whitespace-nowrap text-base font-medium text-gray-50 cursor-pointer hover:text-gray-100">
                  <ShoppingCart style={{ height: "30px", width: "30px" }} />
                </div>
                <p className="ml-8 whitespace-nowrap inline-flex items-center justify-center border border-transparent h-8 w-8 rounded-full shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-green-700">
                  {state.cart.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-primary divide-y-2 divide-green-600">
              <div className="pt-5 mb-6 px-5">
                <div className="flex items-center justify-between">
                  <div onClick={handleGoHome}>
                    <img className="h-8 w-auto" src={logo} alt="Workflow" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-primary rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6  space-y-6">
                <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                  <div
                    className="relative cursor-pointer "
                    onClick={handleToggleOpen}
                  >
                    {local ? (
                      <div className="flex items-center align-middle mr-10 px-16">
                        <div className="text-sm text-white flex items-center ">
                          {" "}
                          <img src={Nig} alt="flag" />
                          <span className="text-sm w-16">
                            <ExpandMore />
                          </span>
                        </div>
                        <p className=" text-white text-base font-bold mr-4">
                          Shop In Nigeria
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center align-middle mr-10 px-16">
                        <div className="text-sm text-white flex items-center ">
                          {" "}
                          <img src={Uk} alt="flag" />
                          <span className="text-sm w-16">
                            <ExpandMore />
                          </span>
                        </div>
                        <p className=" text-white text-base font-bold mr-4">
                          Shop In UK
                        </p>
                      </div>
                    )}
                    {open ? (
                      <div
                        className="z-10 w-48 absolute top-10 left-20 p-3 rounded-2xl bg-secondary text-white"
                        onClick={() => setOpen(false)}
                      >
                        {!local ? (
                          <div
                            onClick={handleToggleLocal}
                            className="flex items-center"
                          >
                            <img src={Nig} alt="flag" />

                            <p className="text-sm ml-3 font-bold">
                              Shop In Nigeria
                            </p>
                          </div>
                        ) : (
                          <div
                            onClick={handleToggleLocal}
                            className="flex items-center"
                          >
                            <img src={Uk} alt="flag" />

                            <p className="text-sm ml-3 font-bold">Shop In UK</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="border border-t-2 border-green-600" />
                <div className="mb-32 px-16">
                  <SearchInput
                    setCategory={setCategory}
                    category={category}
                    handleSearchProduct={handleSearchProduct}
                    keyword={keyword}
                    setKeyword={setKeyword}
                  />
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
