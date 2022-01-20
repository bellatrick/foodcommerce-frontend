
import {Store} from '../context/store'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import load from '../assets/loader.gif'
export default function ProductList() {
  const navigate=useNavigate()
const {state,dispatch}=useContext(Store)
const handleViewProducts = async (category) => {
  dispatch({ type: "SET_CATEGORY", payload: category });
  navigate("/categorysearch");
};
if(!state.categoryPreviewLoading && !state.categories){
  return (
    <h1 onClick={()=>navigate('/')} className=" cursor-pointer flex items-center py-56 hover:text-secondary justify-center align-middle text-primary text-3xl font-bold h-full">
     No Category Selected. Go Back Home
    </h1>
  )}
if(state.categoryPreviewLoading || !state.categories){
  return (
 <div className="mx-auto my-16 sm:my-32">
  <img src={load} alt='' className="w-40 h-40"/>
 </div>
);
}
  return (
    <div className="bg-white relative">
      <div className=" py-16 px-2 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-start  font-extrabold font-heading tracking-tight text-gray-900">
          Categories
        </h2>

        <div className="mt-8 items-center grid grid-cols-2 gap-y-6 sm:grid-cols-3  md:grid-cols-4 sm:gap-x-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-4">
                  {state.categories.map((category) => (
                    <div
                      key={category?.name}
                     onClick={()=>handleViewProducts(category.name)}
                      className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full  p-6 flex flex-col overflow-hidden hover:opacity-75"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img src={category?.image} alt="" className="w-full h-full object-center object-cover" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary opacity-100"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">{category?.name}</span>
                    </div>
                  ))}
                </div>
      
      </div>
  
    </div>
  );
}
