import React, { useContext } from 'react'
import { UserContext } from '../context/User';

export default function UserOrders() {
    const { userOrders, loading } = useContext(UserContext);

    if (loading) {
        return <p>...loading</p>
    }
    return (
        <div >
            <div className='row '>          
            {userOrders?.orders ? (userOrders.orders.map((order,index) =>
                <div className='order col-md-4 ' key={order._id}>
                    <h2 className='pt-3' >order {index+1} details</h2>
                    <div className='order-details'>
                        <p>status: {order.status}  </p>
                        <p>price: {order.finalPrice}  </p>
                        <p>address: {order.address}  </p>
                        <p>phone: {order.phoneNumber}  </p>
                        <p>Date: {(order.createdAt).split('T')[0]}  </p>

                    </div>

                </div>
            )) : "<h2>no orders</h2>"}
             </div>
        </div>
    )
}
