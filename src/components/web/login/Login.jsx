import React from 'react'
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { loginSchema } from '../validation/Validate.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../context/User';

export default function Login() {
    let { setUserToken, userToken } = useContext(UserContext);
    const navigate = useNavigate();

    if (userToken) {
        navigate(-1);
    }

    const initialValues = {
        email: '',
        password: '',
    };
    const onSubmit = async users => {
        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`, users);
        console.log(data);

        if (data.message == 'success') {
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token);
            toast.success('login successfuly ', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/');
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginSchema,

    });
    // console.log(formik);


    const inputs =
        [
            {
                id: 'email',
                type: 'email',
                name: 'email',
                title: 'User Email',
                value: formik.values.email,
            },
            {
                id: 'password',
                type: 'password',
                name: 'password',
                title: 'User Password',
                value: formik.values.password,
            },

        ];
    const renderInputs = inputs.map((input, index) =>
        <Input
            type={input.type}
            name={input.name}
            id={input.id}
            title={input.title}
            value={input.value}
            errors={formik.errors}
            onChange={formik.handleChange}
            touched={formik.touched}
            onBlur={formik.handleBlur}
            key={index}
        />
    )
    return (
        <>
            <div className='container bg-secondary text-white pb-5'>
                <h2 className='text-center py-5'>Create Account</h2>
                <form onSubmit={formik.handleSubmit}>
                    {renderInputs}
                    <button type='submit' className='form-control bg-danger text-white' disabled={!formik.isValid} >Login</button>
                </form>

                <div className='forgetPassword text-end pt-3 pe-3 '>
                    <Link to={'/sendCode'} className='text-white'>Forget Password?</Link>
                </div>
            </div>


        </>
    )
}
