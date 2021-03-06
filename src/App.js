import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./context/store";
import "./App.css";
import { ToastContainer } from "react-toastify";
import NavSection from "./components/NavSection";
import NotFound from "./pages/NotFound";
// import Loader from "react-loader-spinner";
import CategoryView from "./pages/CategoryView";
import CategorySearch from "./pages/CategorySearchList";
import SearchList from "./pages/SearchList";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import loader from "./assets/loader.gif";
const Home = React.lazy(() => import("./pages/Home"));
const ProductView = React.lazy(() => import("./pages/ProductView"));
const Cart = React.lazy(() => import("./pages/Cart"));

function App() {
  return (
    <StoreProvider>
      <Router>
        <Suspense
          fallback={
            <div className="mx-auto mt-32 flex items-center justify-center">
              <img src={loader} alt="loader" className="w-40 h-40"/>
              {/* <Loader
              type="Puff"
              color="#31C9AE"
              height={100}
              width={100}
              timeout={10000}
            /> */}
            </div>
          }
        >
          <NavSection />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product" element={<ProductView />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/search" element={<SearchList />} />
            <Route exact path="/categoryview" element={<CategoryView />} />
            <Route exact path="/categorysearch" element={<CategorySearch />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </StoreProvider>
  );
}

export default App;
