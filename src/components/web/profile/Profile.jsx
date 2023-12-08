import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import './Profile.css'

export default function Profile() {
    let {  userData } = useContext(UserContext);

    if(!userData)
    {
        return <p>loading....</p>
    }

  return (
    <div className='container py-5'>
        <div className='profile text-center'>
            <h1 className='pb-5'>My Profile</h1>
            <img src={userData.image.secure_url} style={{width:'200px', height:'200px'}} />
            <h2 className='py-2'>{userData.userName}</h2>
            <p className='py-2 fs-6'>{userData.email}</p>

        

        </div>
    </div>
  )
}
