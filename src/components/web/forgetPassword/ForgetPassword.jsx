import React from 'react'
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { forgetPasswordSchema } from '../validation/Validate.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../context/User';

export default function ForgetPassword() {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        code:'',
    };
    const onSubmit = async users => {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, users);
      console.log(data);

        if (data.message == 'success') {
            toast.success('password updated successfuly ', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/login');
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: forgetPasswordSchema,

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
            {
              id: 'code',
              type: 'text',
              name: 'code',
              title: 'code',
              value: formik.values.code,
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
                <h2 className='text-center py-5'>Update Password</h2>
                <form onSubmit={formik.handleSubmit}>
                    {renderInputs}
                    <button type='submit' className='form-control bg-danger text-white' disabled={!formik.isValid} >Update </button>
                </form>

            </div>


        </>
    )
}
