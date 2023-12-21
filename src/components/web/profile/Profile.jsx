import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import style from './Profile.module.css'
import { Outlet, Link } from 'react-router-dom';
import Loader from '../../loader/Loader';
export default function Profile() {
  const { userData, loading } = useContext(UserContext);

  if (loading) {
    return <Loader />
  }

  return (
    <aside className={`${style.profile} `}>
      <div className={`${style.profileLinks}`}>
        <nav className='pt-3'>
          <Link to=''>info</Link>
          <Link to='contact'>contact</Link>
          <Link to='orders'>orders</Link>

        </nav>
      </div>

      <div className={`${style.userData} pt-3`}>
        <Outlet />
      </div>



    </aside>

  )
}
