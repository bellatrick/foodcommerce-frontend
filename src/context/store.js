import { createContext, useReducer, useContext } from "react";
export const Store = createContext();
export const useStore = () => useContext(Store);
const initalState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  product: {},
  productList: null,
  filteredList: null,
  categorySearch: null,
  categories: null,
  category: "",
  productListLoading: false,
  productSearchLoading: false,
  categoryLoading: false,
  shippingData: null,
  categoryPreviewLoading: false,
  local: "Nigeria",
  keyword:''
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_SHIPPING":
      return { ...state, shippingData: action.payload };
    case "SET_LOCAL":
      return { ...state, local: action.payload === false ? "Nigeria" : "UK" };
      case 'SET_KEYWORD':
        return{...state, keyword:action.payload}
    case "CATEGORY_PREVIEW_LOADING":
      return { ...state, categoryPreviewLoading: action.payload };
    case "CATEGORY_SEARCH":
      return { ...state, categorySearch: action.payload };
    case "CATEGORY_SEARCH_LOADING":
      return { ...state, categoryLoading: action.payload };
    case "GET_SEARCH_LOADING":
      return { ...state, productSearchLoading: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "GET_SEARCH_LIST":
      return { ...state, filteredList: action.payload };
    case "GET_PRODUCT":
      return { ...state, product: action.payload };
    case "GET_PRODUCT_LIST":
      return { ...state, productList: action.payload };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.find((item) => item.id === newItem.id);
      const cartItems = existItem
        ? state.cart.map((item) =>
            item.id === existItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: [...cartItems] };
    }
    case "CART_SUBTRACT_ITEM": {
      const itemID = action.payload.id;
      const existItem = state.cart.find((item) => item.id === itemID);
      const cartItems =
        existItem && existItem.quantity > 1
          ? state.cart.map((item) =>
              item.id === existItem.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          : state.cart.filter((item) => item.id !== itemID);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: [...cartItems] };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: [...cartItems] };
    }
    case "PRODUCT_LIST_LOADING":
      return { ...state, productListLoading: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const value = {
    state,
    dispatch,
  };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
