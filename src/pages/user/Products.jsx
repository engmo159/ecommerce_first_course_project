import ProductCard from '../../components/user/ProductCard'
import { useProducts } from '../../context/Products/ProductsContext'

const Products = () => {
  const { products, getAllProducts } = useProducts()
  getAllProducts()
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-2 mt-2'>
      {products.map(
        (
          { name, description, price, discountPercentage, rating, thumbnail },
          index
        ) => (
          <ProductCard
            key={index}
            name={name}
            description={description}
            price={price}
            discountPercentage={discountPercentage}
            rating={rating}
            thumbnail={thumbnail}
          />
        )
      )}
    </div>
  )
}

export default Products
