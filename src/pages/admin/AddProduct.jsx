import { useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { Card, Input, Button, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [thumbnail, setThumbnail] = useState('')
  const navigate = useNavigate()

  const submitHandler = e => {
    e.preventDefault()

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/product/add`, {
        name,
        description,
        price,
        stock,
        thumbnail,
      })
      .then(res => {
        console.log(res.data)
      })
      .finally(() => {
        navigate('/admin/products')
      })
      .catch(err => console.error(err))
  }
  return (
    <Card
      color='gray'
      shadow={true}
      className='flex items-center mt-4 text-white'
    >
      <Typography variant='h4'>Add New Product</Typography>

      <form className='mt-8 mb-2 w-full px-8' onSubmit={submitHandler}>
        <div className='flex flex-col items-center justify-evenly gap-8'>
          <div className='w-full gap-8 flex items-center'>
            <Input
              label='ProductName'
              value={name}
              onChange={e => setName(e.target.value)}
              color='teal'
            />
            <Input
              label='ProductDescription'
              value={description}
              onChange={e => setDescription(e.target.value)}
              color='teal'
            />
          </div>
          <div className='w-full gap-8 flex items-center'>
            <Input
              label='ProductPrice'
              value={price}
              onChange={e => setPrice(e.target.value)}
              color='teal'
              type='number'
            />
            <Input
              label='Stock'
              value={stock}
              onChange={e => setStock(e.target.value)}
              color='teal'
              type='number'
            />
          </div>
          <div className='w-full gap-8 flex items-center'>
            <Input
              label='ProductThumbnail'
              value={thumbnail}
              onChange={e => setThumbnail(e.target.value)}
              color='teal'
            />
          </div>
        </div>
        <Button
          className='mt-4 text-lg font-normal'
          fullWidth
          type='submit'
          color={'teal'}
          disabled={name ? false : true}
        >
          Add Product
        </Button>
      </form>
    </Card>
  )
}

export default AddProduct
