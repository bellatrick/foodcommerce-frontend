import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./context/store";
import "./App.css";
import { ToastContainer } from "react-toastify";
import NavSection from "./components/NavSection";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/LoadingSpinner";
const Home = React.lazy(() => import("./pages/Home"));
const ProductView = React.lazy(() => import("./pages/ProductView"));
const Cart = React.lazy(() => import("./pages/Cart"));
const CategoryView = React.lazy(() => import("./pages/CategoryView"));
const CategorySearch = React.lazy(() => import("./pages/CategorySearchList"));
const SearchList = React.lazy(() => import("./pages/SearchList"));
function App() {
  return (
    <StoreProvider>
      <Router>
        <Suspense
          fallback={
            <div data-testid="spin" className="mt-32">
              <LoadingSpinner height={"32"} width={"32"} />
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
