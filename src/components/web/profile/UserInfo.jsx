import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import Loader from '../../loader/Loader';

export default function UserInfo() {
    const { userData, loading } = useContext(UserContext);

    if (loading) {
        return <Loader />
    }
    return (
        <div >
            <img src={userData.image.secure_url} className='rounded-circle' />
            <h2 className='pt-3'>{userData.userName}</h2>
        </div>
    )
}
