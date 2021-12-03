import gql from "graphql-tag";
export const FETCH_PRODUCTS_QUERY = gql`
  {
    getAllProducts {
      id
      name
      desc
      images
      location
      category
      price
      inStock
    }
  }
`;
export const FETCH_CATEGORIES = gql`
  {
    getCategory {
      id
      name
      image
    }
  }
`;
export const FETCH_SHIPPING = gql`
  {
    getShipping {
      id
      uKToNigeria
      nigeriaToUK
    }
  }
`;
export const FETCH_PRODUCTS_BY_LOCATION = gql`
  query getProductByLocation($location: String) {
    getProductByLocation(location: $location) {
      id
      inStock
      name
      desc
      images
      location
      category
      price
    }
  }
`;
export const FETCH_PRODUCTS_BY_CATEGORY = gql`
  query getProductByCategory($category: String) {
    getProductByCategory(category: $category) {
      id
      inStock
      name
      desc
      images
      location
      category
      price
    }
  }
`;
export const FETCH_PRODUCTS_BY_SEARCH = gql`
  query filterProductBySearch($keyword: String) {
    filterProductBySearch(keyword: $keyword) {
      id
      inStock
      name
      desc
      images
      location
      category
      price
    }
  }
`;
