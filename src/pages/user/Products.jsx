import { useEffect } from 'react'
import ProductCard from '../../components/user/ProductCard'
import { useProducts } from '../../context/Products/ProductsContext'

const Products = () => {
  const { products, getAllProducts } = useProducts()
  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-28 mx-16 my-16'>
      {products.map(
        ({ _id, title, description, price, rating, image, stock }, index) => (
          <ProductCard
            key={index}
            title={title}
            description={description}
            price={price}
            rating={rating}
            image={image}
            stock={stock}
            _id={_id}
          />
        )
      )}
    </div>
  )
}

export default Products
