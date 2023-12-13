import React, { useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { CartContext } from '../context/Cart';
import { toast } from 'react-toastify';
export default function Product() {
  const { productId } = useParams();
  const {addToCartContext} = useContext(CartContext);

  const getProduct = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
    return data.product;
  }

  const { data, isLoading } = useQuery('product', getProduct);
  console.log(data);

  const addToCart =async (productId)=>{
    const res = await addToCartContext(productId);
    console.log(res);
  }

  if (isLoading) {
    return <p>loading...</p>
  }
  return (
    <div className='container py-5'>
      <div className='row'>
        <div className='col-lg-4'>
          {data.subImages.map((img, index) =>
          <div className='image py-3' key={index} >
                      <img src={img.secure_url} style={{height:'200px', width:'200px'}} />

          </div>
          )
          }
        </div>

        <div className='col-lg-8'>
          <h2>{data.name}</h2>
          <p >price : {data.price} $</p>
          <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)}>Add To Cart</button>
        </div>
      </div>




    </div>
  )
}
