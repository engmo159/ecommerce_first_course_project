import { useState } from 'react'
import { CartContext } from './CartContext'
import axios from 'axios'
import { useAuth } from '../Auth/AuthContext'
const CartProvider = ({ children }) => {
  const { token } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const addItemsToCart = productId => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/cart/items`, {
        productId,
        quantity: 1,
      })
      .then(res => {
        const cart = res.data
        console.log(cart)
        const cartItemsMapping = cart.items.map(({ product }, quantity) => ({
          productId: product._id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating,
          unitPrice: product.unitPrice,
          quantity,
        }))
        setCartItems([...cartItemsMapping])
        setTotalAmount(cart.totalAmount)
      })
      .catch(err => console.error(err))
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemsToCart,
        setCartItems,
        setTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider
