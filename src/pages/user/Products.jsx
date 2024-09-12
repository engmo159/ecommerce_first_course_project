import { useEffect } from 'react'
import ProductCard from '../../components/user/ProductCard'
import { useProducts } from '../../context/Products/ProductsContext'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

const Products = () => {
  const { products, getAllProducts, productInfoLoading } = useProducts()
  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <>
      {productInfoLoading ? (
        <div className='h-[90vh] flex items-center justify-center '>
          <ClimbingBoxLoader color='#303b53' size={26} />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-28 mx-16 my-16'>
          {products.map(
            (
              { _id, title, description, price, rating, image, stock },
              index
            ) => (
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
      )}
    </>
  )
}

export default Products
