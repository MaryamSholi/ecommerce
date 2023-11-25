import React from 'react'
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { registerSchema } from '../validation/Validate.js';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
    const initialValues= {
        userName: '',
        email: '',
        password: '',
        image:'',
    };
    const handleFieldChange = (event)=>{
        console.log("test");
        formik.setFieldValue('image', event.target.files[0]);
    };
    const onSubmit = async users=>{
        const formData = new FormData();
        formData.append("userName", users.userName);
        formData.append("email", users.email);
        formData.append("password", users.password);
        formData.append("image", users.image);

        const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`, formData);
        console.log(data);

        if(data.message == 'success')
        {
            formik.resetForm();
                toast.success('Your Account Created successfuly , please verify your email to login', {
                    position: "bottom-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema,
        
    });
    // console.log(formik);
   

    const inputs =
        [
            {
                id: 'username',
                type: 'text',
                name: 'userName',
                title: 'User Name',
                value: formik.values.userName,
            },
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
                id: 'image',
                type: 'file',
                name: 'image',
                title: 'User image',
                onChange: handleFieldChange,
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
        onChange={input.onChange || formik.handleChange} 
        touched ={formik.touched}
        onBlur ={formik.handleBlur}
        key={index} 
        />
    )
    return (
        <>
            <div className='container bg-secondary text-white pb-5'>
                <h2 className='text-center py-5'>Create Account</h2>
                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                    {renderInputs}
                    <button type='submit' className='form-control bg-danger text-white' disabled={!formik.isValid} >Create Account</button>
                </form>

            </div>
        </>
    )
}
