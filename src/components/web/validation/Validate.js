import * as yup from 'yup';
export const registerSchema = yup.object({
    userName: yup.string().required("userName is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),
    email: yup.string().required("email is required").email(),
    password: yup.string().required("password is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),

})

export const loginSchema = yup.object({
    email: yup.string().required("email is required").email(),
    password: yup.string().required("password is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),

})

export const sendCodeSchema = yup.object({
    email: yup.string().required("email is required").email(),

})

export const forgetPasswordSchema = yup.object({
    email: yup.string().required("email is required").email(),
    password: yup.string().required("password is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),
    code: yup.string().required("code is required").min(4, "must be at least 4 characters").max(4, "must be at most 4 characters"),

})

export const orderSchema = yup.object({
    address: yup.string().required("address is required"),
    phone: yup.string().matches(/^\d{10}$/, 'Invalid phone number'),

})