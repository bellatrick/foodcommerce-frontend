import {  SearchIcon } from '@heroicons/react/solid'
import {Store} from '../context/store'
import Dropdown from './Dropdown'
import {useContext} from 'react'
export default function Example({keyword,setKeyword,setCategory,handleSearchProduct,category}) {
 const {dispatch}=useContext(Store)
    return (
      <div>
        <form onSubmit={handleSearchProduct} className=" flex relative rounded-md shadow-sm">
          <div className="inline-flex  items-center px-3 rounded-l-md   bg-gray-900 text-white sm:text-sm">
         <Dropdown setCategory={setCategory}  category={category}/>
          </div>
          <input
            type="text"
            onChange={(e)=>{setKeyword(e.target.value)
            dispatch({type:'SET_KEYWORD',payload:e.target.value })}}
            name="company-website"
            value={keyword}
            id="company-website"
            className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            placeholder="Search"
          />

           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon  className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        </form>
      </div>
    )
  }
  