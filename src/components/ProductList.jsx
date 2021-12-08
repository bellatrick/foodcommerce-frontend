import { useNavigate } from "react-router-dom";
import { ShoppingCart, Report } from "@material-ui/icons";
import { Store } from "../context/store";
import { toast } from "react-toastify";
import { useContext,useMemo,useState } from "react";
import Counter from "../components/Counter";
import Loader from "react-loader-spinner";

import Paginate from '../components/Paginate'
let PageSize = 8;
export default function Example() {
  const { dispatch,state } = useContext(Store);
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if(state.productList &&state.productList.length>1){
      return state.productList &&state.productList.slice(firstPageIndex, lastPageIndex); 
   
    }
    if(state.productList &&state.productList.length<=1){
      return state.productList &&state.productList  
    }
     
  }, [currentPage,state?.productList]);


  const navigate = useNavigate();
  const handleViewProduct = (product) => {
    dispatch({ type: "GET_PRODUCT", payload: product });
    navigate("/product");
  };
  const handleAddToCart2 = (item) => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity: 1 } });
  };
  const handleAddToCart = (item) => {
    toast.dismiss();
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity: 1 } });
    toast.success(`${item.name} has been added to your cart!`);
    console.log(state.cart);
  };
 
  const subtractHandler = (item) => {
    dispatch({ type: "CART_SUBTRACT_ITEM", payload: item });
  };
  if (
    state.productListLoading ||
    !state.productList ||
    (state.productListLoading && state.productList)
  ) {
    return (
      <div className="mx-auto mt-32 flex items-center justify-center">
      <Loader
        type="Puff"
        color="#31C9AE"
        height={100}
        width={100}
        timeout={5000}
      />
    </div>
    );
  }

 else if (state.productList <= 0) {
    return (
      <h1 className="flex items-center py-5 justify-center align-middle text-primary text-3xl font-bold h-full">
        No product found
      </h1>
    );
  }
   


    return (
      <div className="bg-white" id='productlist'>
        <div className=" mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-gray-800">
            Browse Our Products
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {currentData&&currentData.map((product, i) => (
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
                        ? `€${product.price}`
                        : `₦${product.price}`}
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
                ) : product.inStock === true ? (
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
          <Paginate
        className="flex items-center justify-center"
        currentPage={currentPage}
        totalCount={state.productList.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
        </div>
      </div>
    );
}
