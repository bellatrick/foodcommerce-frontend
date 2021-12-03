
import {Store} from '../context/store'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'

export default function ProductList() {
  const navigate=useNavigate()
const {state,dispatch}=useContext(Store)
const handleViewProducts = async (category) => {
  dispatch({ type: "SET_CATEGORY", payload: category });
  navigate("/categorysearch");
};
  return (
    <div className="bg-white">
      <div className=" py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl text-start  font-extrabold font-heading tracking-tight text-gray-900">
          Categories
        </h2>

        <div className="mt-8 items-center  grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-10 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-12">
                  {state.categories.map((category) => (
                    <div
                      key={category?.name}
                     onClick={()=>handleViewProducts(category.name)}
                      className="relative  mx-16 sm:mx-0 sm:w-56 h-80 rounded-lg  p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img src={category?.image} alt="" className="w-full h-full object-center object-cover" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary opacity-100"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">{category?.name}</span>
                    </div>
                  ))}
                </div>
      
      </div>
    </div>
  );
}
