import { XIcon } from "@heroicons/react/solid";
import { useState, useContext, useEffect } from "react";
import { Store } from "../context/store";
import Counter from "../components/Counter";
import Modal from "../components/Modal";

import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import cartanime from '../assets/cart.gif'
export default function Cart() {
  const navigate = useNavigate();
  const { dispatch, state, NGFormat, EUFormat } = useContext(Store);
  const [open, setOpen] = useState(false);
  const [no1] = useState("+2348136181659");
  const [no2] = useState("+447588067218");
  const [messageStr, setMessage] = useState();
  const handleAddToCart = (item) => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity: 1 } });
  };
  const subtractHandler = (item) => {
    dispatch({ type: "CART_SUBTRACT_ITEM", payload: item });
  };
  useEffect(() => {
    const UKItems = state.cart
      .filter((item) => item.location === "UK")
      .filter((item) => item.inStock === true);
    const NigeriaItems = state.cart
      .filter((item) => item.location === "Nigeria")
      .filter((item) => item.inStock === true);
    const nigTotal = NigeriaItems.reduce((a, b) => a + b.price * b.quantity, 0);
    const UKTotal = UKItems.reduce((a, b) => a + b.price * b.quantity, 0);
    const message = `Hello I just made an order on your website. Please send me your account details and I would send you the recipient's details. I purchased the following items. ${
      UKItems.length > 0
        ? UKItems.map(
            (item, i) =>
              ` Item name: ${item.name}${"  "} quantity: ${
                item.quantity
              }${"  "} price: ${EUFormat.format(item.price)}${"  "} `
          )
        : ""
    } ${
      NigeriaItems.length > 0
        ? NigeriaItems.map(
            (item, i) =>
              `Item name: ${item.name}${"  "} quantity: ${
                item.quantity
              }${"  "} price: ${NGFormat.format(item.price)} ${"  "}`
          )
        : ""
    } Total amount of purchased item is ${
      nigTotal ? `(items from Nigeria) ${NGFormat.format(nigTotal)} ` : ""
    } ${
      UKTotal ? `and (Items from the UK)  ${EUFormat.format(UKTotal)} ` : ""
    }`;
    setMessage(message);
  }, [state.cart, EUFormat, NGFormat]);

  const handleSubmit = async () => {
    setOpen(true);
  };
  if (state.cart.length <= 0) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center my-20">
        <div>
          <img src={cartanime} alt='' style={{ width: "400px", height: "400px" }}/>
      
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 text-lg my-4 tracking-wider font-bold">
            Your Shopping Cart is Empty
          </p>
       <div className='flex items-center justify-center'>
       <p
            onClick={() => navigate("/")}
            className="py-2  bg-secondary text-center cursor-pointer hover:bg-primary text-white w-36 rounded"
          >
            Start Shopping
          </p>{" "}
       </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold font-heading tracking-wider text-gray-700 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {state.cart.map((product) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={"cart item"}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <div className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </div>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.location === "UK"
                            ? EUFormat.format(product.price * product.quantity)
                            : NGFormat.format(product.price * product.quantity)}
                        </p>
                        {product.inStock ? (
                          <div className="mt-20 flex text-sm">
                            <Counter
                              item={product}
                              addHandler={handleAddToCart}
                              subtractHandler={subtractHandler}
                              quantity={product.quantity}
                            />
                          </div>
                        ) : (
                          <p className="text-sm text-primary font-bold mt-6">
                            This product is out of stock
                          </p>
                        )}
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute top-0 right-0">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "CART_REMOVE_ITEM",
                                payload: product,
                              })
                            }
                            type="button"
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}

          {state.cart
            .filter((item) => item.location === "Nigeria")
            .filter((item) => item.inStock === true).length > 0 ||
          state.cart
            .filter((item) => item.location === "UK")
            .filter((item) => item.inStock === true).length > 0 ? (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary (Nigeria)
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {NGFormat.format(
                      state.cart
                        .filter((item) => item.location === "Nigeria")
                        .filter((item) => item.inStock === true)
                        .reduce((a, c) => a + c.price * c.quantity, 0)
                    )}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"></div>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {state.shippingData
                      ? NGFormat.format(state.shippingData?.nigeriaToUK)
                      : "Network error"}
                  </dd>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  {state.shippingData ? (
                    <dd className="text-base font-medium text-gray-900">
                      {NGFormat.format(
                        state.cart
                          .filter((item) => item.location === "Nigeria")
                          .filter((item) => item.inStock === true)
                          .reduce((a, c) => a + c.price * c.quantity, 0) +
                          +state.shippingData?.nigeriaToUK
                      )}
                    </dd>
                  ) : (
                    "Network is unavailable "
                  )}
                </div>
              </dl>
              <div>
                {state.cart
                  .filter((item) => item.location === "UK")
                  .filter((item) => item.inStock === true).length > 0 ? (
                  <div className="mt-7">
                    <h2
                      id="summary-heading"
                      className="text-lg font-medium text-gray-900"
                    >
                      Order summary (UK)
                    </h2>

                    <dl className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Subtotal</dt>
                        {
                          <dd className="text-sm font-medium text-gray-900">
                            {EUFormat.format(
                              state.cart
                                .filter((item) => item.location === "UK")
                                .filter((item) => item.inStock === true)
                                .reduce((a, c) => a + c.price * c.quantity, 0)
                            )}
                          </dd>
                        }
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        <dt className="flex items-center text-sm text-gray-600">
                          <span>Shipping estimate</span>
                          <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"></div>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                          {state.shippingData
                            ? EUFormat.format(state.shippingData.uKToNigeria)
                            : "Network Error"}
                        </dd>
                      </div>

                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        <dt className="text-base font-medium text-gray-900">
                          Order total
                        </dt>
                        {state.shippingData ? (
                          <dd className="text-base font-medium text-gray-900">
                            {EUFormat.format(
                              state.cart
                                .filter((item) => item.location === "UK")
                                .filter((item) => item.inStock === true)
                                .reduce((a, c) => a + c.price * c.quantity, 0) +
                                +state.shippingData.uKToNigeria
                            )}
                          </dd>
                        ) : (
                          "Network is unavailable"
                        )}
                      </div>
                    </dl>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full bg-secondary border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:green-indigo-500"
                >
                  Contact seller
                </button>
              </div>
            </section>
          ) : (
            ""
          )}
        </form>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        no1={no1}
        no2={no2}
        message={messageStr}
      />
      <Footer />
    </div>
  );
}
