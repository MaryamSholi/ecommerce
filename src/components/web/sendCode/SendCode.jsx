import React from 'react'
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { sendCodeSchema } from '../validation/Validate.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function SendCode() {

    const navigate = useNavigate();

    const initialValues = {
        email: '',
    };
    const onSubmit = async users => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, users);

        if (data.message == 'success') {
            toast.success('code send successfuly ', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/forgetPassword');
        }

      
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: sendCodeSchema,

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
                <h2 className='text-center py-5'>Send Code</h2>
                <form onSubmit={formik.handleSubmit}>
                    {renderInputs}
                    <button type='submit' className='form-control bg-danger text-white' disabled={!formik.isValid} >Send </button>
                </form>

            </div>

        </>
    )
}
