import { useNavigate } from "react-router-dom";
import { ShoppingCart, Report } from "@material-ui/icons";
import { Store } from "../context/store";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import Counter from "../components/Counter";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_PRODUCTS_QUERY } from "../utils/Graphql";
import { useEffect } from "react";
const filterResults = (list, keyword) => {
  return list.filter((x) => {
    const a = x?.name?.toLowerCase().split(" ");
    const b = x?.desc?.toLowerCase().split(" ");
    const c = x?.price?.toLowerCase().split(" ");
    const d = x?.category?.toLowerCase().split(" ");
    const arr = [...a, ...b, ...c, ...d];
    return arr.some((word) => word.includes(keyword.toLowerCase()));
  });
};
export default function Example() {
  const { loading, data } = useQuery(FETCH_PRODUCTS_QUERY);

  const [filteredList, setFilteredList] = useState();
  const { dispatch, state } = useContext(Store);
  const navigate = useNavigate();
  const handleViewProduct = (product) => {
    dispatch({ type: "GET_PRODUCT", payload: product });
    navigate("/product");
  };

  useEffect(() => {
    if (data && state.keyword.trim().length > 0) {
      const arr = filterResults(data.getAllProducts, state.keyword.trim());
      setFilteredList(arr);
    }
  }, [data, state.keyword]);
  const handleAddToCart2 = (item) => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity: 1 } });
  };
  const handleAddToCart = (item) => {
    toast.dismiss();
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity: 1 } });
    toast.success(`${item.name} added to cart`);
    console.log(state.cart);
  };
  const subtractHandler = (item) => {
    dispatch({ type: "CART_SUBTRACT_ITEM", payload: item });
  };
  if (loading) {
    return (
      <div className="mx-auto my-56">
        <LoadingSpinner height={"32"} width={"32"} />
      </div>
    );
  }
  if (filteredList <= 0) {
    return (
      <h1 className="flex items-center py-56 justify-center align-middle text-primary text-3xl font-bold h-full">
        No product found
      </h1>
    );
  } else
    return (
      <div className="bg-white">
        <div className=" mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-gray-800">
            Browse Our Products
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {filteredList &&
              filteredList.map((product, i) => (
                <div key={product.id} className="shadow-md p-2">
                  <div
                    className="relative"
                    onClick={() => handleViewProduct(product)}
                  >
                    <div className="relative w-full h-72 rounded-lg overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={"product"}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="relative mt-4 px-5">
                      <h3 className="text-base mb-3  font-bold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="relative text-sm font-semibold text--gray-900">
                        {product.location === "UK"
                          ? `$${product.price}`
                          : `N${product.price}`}
                      </p>
                    </div>
                  </div>
                  {state.cart.find((item) => item?.id === product.id) ? (
                    <div className="mt-6 flex items-center justify-center">
                      <Counter
                        item={product}
                        addHandler={handleAddToCart2}
                        subtractHandler={subtractHandler}
                        quantity={
                          state.cart.find((item) => item?.id === product.id)
                            .quantity
                        }
                      />
                    </div>
                  ) : product.inStock ? (
                    <div
                      className="mt-6"
                      onClick={() => handleAddToCart(product)}
                    >
                      <div className="relative  flex bg-secondary border border-transparent rounded-md py-2 mx-10 cursor-pointer px-8 items-center justify-center text-sm font-medium text-white hover:bg-green-800">
                        <ShoppingCart className="mr-5" /> Add To Cart
                        <span className="sr-only">, {product.name}</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="mt-6"
                      onClick={() => {
                        toast.dismiss();
                        toast.warn(`${product.name} is out of stock`);
                      }}
                    >
                      <div className="relative  flex bg-gray-400 border border-transparent rounded-md py-2 mx-10 cursor-pointer px-8 items-center justify-center text-sm font-medium text-gray-700">
                        <Report className="mr-5 text-red-500 hover:text-red-400" />{" "}
                        Out of Stock
                        <span className="sr-only">, {product.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
}
