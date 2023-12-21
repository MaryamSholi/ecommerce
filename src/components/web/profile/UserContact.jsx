import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import Loader from '../../loader/Loader';

export default function UserContact() {
    const { userData, loading } = useContext(UserContext);

    if (loading) {
        return <Loader />
    }
    return (
        <div >
            <h2 className='pt-3'>{userData.email}</h2>
        </div>
    )
}
