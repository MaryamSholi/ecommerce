import React from 'react'

export default function Input({ type = 'text', id, title, name, value, onChange, errors, onBlur, touched  }) {
    // console.log(touched);
    return (
        <>
            <div className='input-group mb-3 row' >
                <div className='col-md-2'>
                <label htmlFor={id} >{title}</label>
                </div>
                <div className='col-md-10'>
                <input type={type} name={name} className='form-control' id={id} value={value} onBlur={onBlur} onChange={onChange}/>
                </div>

                {touched[name]&&errors[name]&&<p className='text text-danger'>{errors[name]}</p>}
            </div>

        </>
    )
}
