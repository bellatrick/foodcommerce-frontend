import {useContext} from 'react'
import Pagination from './Pagination'
import ProductList from './ProductList'
import { Store } from "../context/store";
import LoadingSpinner from "../components/LoadingSpinner";
const Users = () => {
const {  state } = useContext(Store);
if (
    state.productListLoading ||
    !state.productList ||
    (state.productListLoading && state.productList)
  ) {
    return (
      <div className="mx-auto my-10">
        <LoadingSpinner height={"32"} width={"32"} />
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
  else  return (
   <>
      {state.productList.length > 0 ? (
        <>
          <Pagination
            data={state.productList}
            RenderComponent={ProductList}
            title="Products"
            pageLimit={Math.floor(state.productList.length/3)}
            dataLimit={3}
          />
        </>
      ) : (
       ''
      )}
   </>);
}

export default Users
