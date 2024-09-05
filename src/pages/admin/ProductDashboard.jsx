import { Card, Typography, Button, Avatar } from '@material-tailwind/react'
import { useProducts } from '../../context/Products/ProductsContext'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useEffect } from 'react'

const TABLE_HEAD = ['Product', 'Price', 'Operations']

const ProductDashboard = () => {
  const { products, getAllProducts } = useProducts()
  useEffect(() => {
    getAllProducts()
  }, [])

  const deleteProduct = (thumbnail, id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900 transition-all mx-2',
        cancelButton:
          'bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-900 transition-all mx-2',
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        // icon: 'warning',
        imageUrl: `${thumbnail}`,

        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`)
            .then(response => {
              console.log(response.data)
              getAllProducts()
            })
            .finally(() => {
              swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              })
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
          })
        }
      })
  }

  return (
    <div className='w-full flex flex-col  gap-4 '>
      <h1 className='text-center text-4xl text-gray-900 font-bold mt-4'>
        Products
      </h1>
      <Link to={`/admin/products/add`}>
        <Button color='green' className='w-fit'>
          Add New Product
        </Button>
      </Link>
      <section className='w-full '>
        <Card className='h-full w-full bg-blue-gray-700  border border-gray-500 px-6 '>
          <table className='w-full min-w-max table-auto text-center'>
            <thead>
              <tr>
                {TABLE_HEAD.map(head => (
                  <th key={head} className=' pb-4 pt-10 '>
                    <Typography
                      variant='small'
                      color='black'
                      className='font-bold leading-none text-xl'
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products?.map(({ thumbnail, price, _id }, index) => (
                <tr key={index} className='border border-teal-700 '>
                  <td>
                    <Avatar src={thumbnail} alt='avatar' size='xl' />
                  </td>
                  <td>
                    <Typography
                      variant='small'
                      className='font-normal text-white text-lg'
                    >
                      {price}

                      <span className='text-green-400 text-xl'> $</span>
                    </Typography>
                  </td>
                  <td className='w-1/3'>
                    <Typography
                      variant='small'
                      as={'div'}
                      className='font-normal text-white flex items-center justify-center gap-8 '
                    >
                      <Link to={`/admin/products/${_id}`}>
                        <Button color='blue'>View </Button>
                      </Link>
                      <Link to={`/admin/products/edit/${_id}`}>
                        <Button color='amber'>Edit</Button>
                      </Link>
                      <Button
                        color='red'
                        onClick={() => deleteProduct(thumbnail, _id)}
                      >
                        Delete
                      </Button>
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  )
}

export default ProductDashboard
