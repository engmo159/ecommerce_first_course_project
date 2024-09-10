import { createContext, useContext } from 'react'

export const ProductsContext = createContext({
  products: [],
  product: {},
  lastProduct: {},
  productInfoLoading: false,
  getProductById: () => {},
  getAllProducts: () => {},
  getLastProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  addNewProduct: () => {},
})
export const useProducts = () => useContext(ProductsContext)
