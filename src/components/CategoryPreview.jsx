import { useNavigate } from "react-router-dom";
import { Store } from "../context/store";
import { useContext } from "react";
import load from '../assets/loader.gif'
export default function CategoryPreview() {
  const { state, dispatch } = useContext(Store);

  const navigate = useNavigate();

  const handleViewCategory = () => {
    navigate("/categoryview");
  };
  const handleViewProducts = async (category) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
    navigate("/categorysearch");
  };
  if(state.categoryPreviewLoading || !state.categories){
     return (
    <div className="mx-auto my-32 flex items-center justify-center ">
<img src={load} alt='' className="w-40 h-40"/>
    </div>
  );
  }

  return (
    <div className="bg-white">
      <div className="pt-4 sm:pt-8 xl:max-w-7xl xl:mx-auto xl:px-2">
        <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
          <h2 className="text-3xl font-extrabold font-heading text-gray-800">
            Shop by Category
          </h2>
          <div
            onClick={handleViewCategory}
            className="hidden font-bold cursor-pointer  text-base font-heading text-gray-900 hover:text-primary sm:block"
          >
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </div>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 relative h-56 overflow-x-auto xl:overflow-visible scrollbar-hide">
              <div className="absolute min-w-screen-xl  px-4 flex space-x-4 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-6 xl:gap-x-8">
                {state.categories.slice(0,6).map((category, i) => (
                  <div
                    key={i}
                    onClick={() => handleViewProducts(category.name)}
                    className="relative w-40 h-40 rounded-full  p-6 flex flex-col overflow-hidden hover:opacity-75 "
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img
                        src={category?.image}
                        alt=""
                        className="w-full h-full object-center object-cover"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary opacity-100"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">
                      {category?.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className=" px-4 sm:hidden">
          <div  onClick={handleViewCategory} className="block cursor-pointer text-sm font-semibold text-black hover:text-primary">
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
