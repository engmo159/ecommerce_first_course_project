import { useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import axios from 'axios'
import { useAuth } from '../Auth/AuthContext'
const CartProvider = ({ children }) => {
  const { token } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  // getAllCartItems
  const fetchCartData = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/cart`)
      .then(res => {
        const cartItemsMapping = res.data.items.map(
          ({ product, quantity }) => ({
            productId: product?._id,
            title: product?.title,
            price: product?.price,
            description: product?.description,
            category: product?.category,
            image: product?.image,
            rating: product?.rating,
            stock: product?.stock,
            unitPrice: product?.unitPrice,
            quantity,
          })
          // {
          //   headers: { Authorization: `Bearer ${token}` },
          // }
        )
        setCartItems(cartItemsMapping)
        setTotalAmount(res.data.totalAmount)
        console.log(res)
      })
      .catch(err => console.error(err))
  }
  useEffect(() => {
    fetchCartData()
  }, [token])

  // add items to cart function
  const addItemsToCart = productId => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/items`,
        {
          productId,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        const cart = res.data
        const cartItemsMapping = res.data.items.map(
          ({ product, quantity }) => ({
            productId: product?._id,
            title: product?.title,
            price: product?.price,
            description: product?.description,
            category: product?.category,
            image: product?.image,
            rating: product?.rating,
            unitPrice: product?.unitPrice,
            stock: product?.stock,
            quantity,
          })
        )

        setCartItems(cartItemsMapping)
        setTotalAmount(cart.totalAmount)
      })
      .catch(err => console.error(err))
  }

  // update cart
  const updateItemsInCart = ({ productId, quantity }) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/cart/items/edit`,
        {
          productId,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        const cart = res.data
        const cartItemsMapping = cart.items.map(
          ({ product, quantity, unitPrice }) => ({
            productId: product._id,
            title: product.title,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: product.rating,
            stock: product.stock,
            quantity,
            price: unitPrice,
          })
        )

        setCartItems(cartItemsMapping)
        setTotalAmount(cart.totalAmount)
      })
      .then(() => fetchCartData())
      .catch(err => console.error(err))
  }

  const deleteItemInCart = productId => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/items/delete/${productId}`
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then(res => {
        const cart = res.data
        const cartItemsMapping = res.data.items.map(
          ({ product, quantity, unitPrice }) => ({
            productId: product._id,
            title: product.title,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: product.rating,
            stock: product.stock,
            quantity,
            price: unitPrice,
          })
        )

        setCartItems([...cartItemsMapping])
        setTotalAmount(cart.totalAmount)
      })
      .catch(err => console.error(err))
  }

  const clearCartHandler = () => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart`
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      )
      .then(() => {
        setCartItems([])
        setTotalAmount(0)
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
        updateItemsInCart,
        deleteItemInCart,
        clearCartHandler,
        fetchCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider
