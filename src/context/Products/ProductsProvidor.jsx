import { useState } from 'react'
import { ProductsContext } from './ProductsContext'
import axios from 'axios'
import { useAuth } from '../Auth/AuthContext'

const { token } = useAuth
const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [lastProduct, setLastProduct] = useState()
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
  // get last product
  const getLastProduct = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/last-product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('Last Product:', res.data)
        setLastProduct(res.data)
      })
      .catch(error => {
        console.error('Error fetching last registered user:', error)
      })
  }
  return (
    <ProductsContext.Provider
      value={{
        products,
        getProductById,
        product,
        getAllProducts,
        getLastProduct,
        lastProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
export default ProductsProvider
