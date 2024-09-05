import { createContext, useContext } from 'react'

export const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
  product: {},
  setProduct: () => {},
  getProductById: () => {},
  getAllProducts: () => {},
})
export const useProducts = () => useContext(ProductsContext)
