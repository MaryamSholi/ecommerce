import React from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
export default function CategoriesDetails() {
  const { categoryId } = useParams();

  const getCategoryDetails = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
    return data.products;

  }

  const { data, isLoading } = useQuery('category_details', getCategoryDetails);

  if (isLoading) {
    return <p>loading...</p>
  }
  return (
    <div className='container py-5'>
      <div className='products'>
        <div className="row row-gap-3">
          {
            data.length ? data.map((product) =>
              <div className='col-md-4 product' key={product._id}>
                <div className="card" style={{ width: '20rem' }}>
                  <div className='pb-3'>
                    <img src={product.mainImage.secure_url} className="card-img-top" style={{ height: '300px', width: 'revert-layer' }} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <Link to={`/product/${product._id}`} className="btn btn-primary">Details</Link>
                  </div>
                </div>

              </div>
            ) : <h2>no product</h2>
          }
        </div>
      </div>
    </div>




  )
}
