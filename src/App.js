import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./context/store";
import './App.css';
import Home from './pages/Home';
import ProductView from './pages/ProductView'
import Cart from './pages/Cart'
import CategoryView from './pages/CategoryView'
import { ToastContainer } from "react-toastify";
import NavSection from "./components/NavSection";
import Footer from "./components/Footer";
import SearchList from './pages/SearchList'
import CategorySearch from './pages/CategorySearchList'
function App() {
  return (
    <StoreProvider>
   
      <Router>
      <NavSection/>
        <Routes>
          <Route exact path="/" element={ <Home/>}/>
          <Route exact path="/product" element={ <ProductView/>}/>
          <Route exact path="/cart" element={ <Cart/>}/>
          <Route exact path="/search" element={ <SearchList/>}/>
          <Route exact path="/categoryview" element={ <CategoryView/>}/>
          <Route exact path="/categorysearch" element={ <CategorySearch/>}/>
        </Routes>
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
       <Footer />
    </StoreProvider>
  );
}

export default App;
