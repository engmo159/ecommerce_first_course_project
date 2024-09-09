import { createContext, useContext } from 'react'

export const ProductsContext = createContext({
  products: [],
  product: {},
  lastProduct: {},
  getProductById: () => {},
  getAllProducts: () => {},
  getLastProduct: () => {},
})
export const useProducts = () => useContext(ProductsContext)
