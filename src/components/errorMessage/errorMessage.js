import React from 'react'
import './errorMessage.css'
import img from './error1.jpg'

const ErrorMessage=()=>{
    return (
    <>
    <img src= {img} width='395px' alt='error'></img>
    <span>Something goes wrong</span>
    </>
    )
}

export default ErrorMessage;