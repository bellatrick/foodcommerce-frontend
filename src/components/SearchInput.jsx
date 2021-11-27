import {  SearchIcon } from '@heroicons/react/solid'
import {ExpandMore} from '@material-ui/icons'
export default function Example() {
    return (
      <div>
     
        <div className=" flex relative rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md   bg-gray-900 text-white sm:text-sm">
          <span>Category</span> <span><ExpandMore/></span>  
          </span>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            placeholder="Search"
          />
           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        </div>
      </div>
    )
  }
  