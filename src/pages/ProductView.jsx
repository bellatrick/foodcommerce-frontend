import { useState,useContext,useEffect } from "react";
import {  Tab } from "@headlessui/react";
import {Store} from '../context/store'
import { ShoppingCart, Report } from "@material-ui/icons";
import Counter from "../components/Counter";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const navigate=useNavigate()
const {dispatch,state} =useContext(Store)
  const [count, setCount] = useState(0);
  const addHandler = ( item,quantity) => {
    setCount(quantity + 1);
    dispatch({type:'CART_ADD_ITEM', payload:{...item,quantity:1}})
  };
  const subtractHandler = ( item,quantity) => {
    if (count <= 0) return;
    setCount(quantity - 1);
    dispatch({type:'CART_SUBTRACT_ITEM', payload:item})
  };
  useEffect(() => {
  const prod =state.cart.find((item=>item.id===state.product?.id))
  if(prod){
    setCount(prod.quantity)
  }
  }, [state.cart, state.product])
  if(!state.product.name){
    return <p onClick={()=>navigate('/')} className='flex justify-center align-middle items-center my-56 text-2xl text-primary font-bold cursor-pointer hover:text-secondary'>No product selected, Go back home</p>
  }
  else
  return (
    <div className="bg-white relative">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {state.product?.images.map((image, i) => (
                  <Tab
                    key={i}
                    className="relative h-36  rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{image.name}</span>
                        <span className="absolute inset-0 rounded-md overflow-hidden">
                          <img
                            src={image}
                            alt="products"
                            className="w-full h-full object-center object-cover"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-green-500" : "ring-transparent",
                            "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
              {state.product?.images.map((image,i) => (
                <Tab.Panel key={i}>
                  <img
                    src={image}
                    alt={'product'}
                    className="w-full h-96 object-center object-cover rounded-t-sm rounded-bl-sm rounded-br-3xl"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {state.product?.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">{state.product?.location==='UK'?`€ ${state.product?.price}`:`N ${state.product?.price}`}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                // dangerouslySetInnerHTML={{ __html: state.product?.desc }}
              
              >
                {state.product?.desc}
                   </div>
            </div>

            <form className="mt-6">
           {state.product?.inStock?    <div className="mt-10 flex flex-col align-center items-center">
                <button
                type='button'
                 onClick={()=>{
                   setCount((prev)=>prev+1)
                  dispatch({type:'CART_ADD_ITEM', payload:{...state.product,quantity:1}})}}
                  className="max-w-xs flex-1 bg-secondary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500 sm:w-full"
                >
                  <ShoppingCart /> Add to Cart
                </button>
                <div className="mt-8">
                  <Counter
                    addHandler={addHandler}
                    subtractHandler={subtractHandler}
                    quantity={count}
                    item={state.product}
                  />
                </div>
              </div>:<div>
              <button
                type='button'
               onClick={()=>toast.warn(`Sorry,${state.product?.name} is out of stock`)}
                  className="max-w-xs flex-1 mx-auto bg-gray-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500 sm:w-full"
                >
                  <Report className='text-red-400 mr-2' /> Out of Stock
                </button>
                </div>}
            </form>
          </div>
        </div>
      
      </div>
      
    </div>
  );
}
