import { useState } from 'react'
import { ProductsContext } from './ProductsContext'
import axios from 'axios'
const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  // get all products
  const getAllProducts = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/product`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }

  // git product by id
  const getProductById = id => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`).then(res => {
      setProduct(res.data)
    })
  }
  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        setProduct,
        getProductById,
        product,
        getAllProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
export default ProductsProvider
