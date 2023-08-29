import React, { useState, } from 'react'
// import { firstName } from "../App";
import rcss  from "./register.module.css"
import {useNavigate} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './serverapi'
// require('dotenv').config();
// import.meta.env.BASE_URI

const Registration = () => {
  // const context = useContext(firstName);
  const Navigate=useNavigate()
  // const host = process.env.BASE_URI;

    // const {register} = context;
    const [text, setText] = useState({name:"",email:"",password:"",})
    const handlechange =(e)=>{

        setText({...text,[e.target.name]:e.target.value})

    }
   const handleClick=async(e)=>{
    toast.success("Registration successfully !",{position:"top-right",theme: "dark",})
    e.preventDefault()
const response = await fetch(`${api}/registeration`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({name:text.name,email:text.email,password:text.password})
  })
    const json= await response.json()
    if(json.success){
      localStorage.setItem("token",json.token)
      Navigate("/")
    }
    console.log(json)
    console.log(response)
    console.log("register successfully")
  
}
   
  return (
    <>
    <h1 className=' d-flex justify-content-center mt-4'>Create an account for Note-App </h1>

    <div className="d-flex justify-content-center mt-5 ">

    <div className={rcss.card}>
  <div className={rcss.cardheader}>
    <div className={rcss.textheader}>Register</div>
  </div>
  <div className={rcss.cardbody}>
    <form action="#">
      <div className={rcss.formgroup}>
        <label htmlFor="username">Name:</label>
        <input required="" onChange={handlechange} value={text.name} className="form-control" name="name" id="name" type="text"/>
      </div>
      <div className={rcss.formgroup}>
        <label htmlFor="email">Email:</label>
        <input required="" onChange={handlechange} value={text.email} className="form-control" name="email" id="email" type="email"/>
      </div>
      <div className={rcss.formgroup}>
        <label htmlFor="password">Password:</label>
        <input required="" onChange={handlechange} value={text.password} className="form-control" name="password" id="password" type="password"/>
      </div>
     
     <input type="submit" onClick={handleClick} className={rcss.btn} value="submit"/>
     <ToastContainer />
        </form>
  </div>
</div>
    </div>

    </>
  )
}

export default Registration
