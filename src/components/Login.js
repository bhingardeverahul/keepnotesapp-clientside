import React, { useState } from 'react'
import lgcss from'./login.module.css'
// import { firstName } from "../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
// require('dotenv').config();
import api from './serverapi'
const Login = () => {
  // const context = useContext(firstName);
  const Navigate=useNavigate()
  // const host = process.env.BASE_URI;
  // const {login} = context;
  const [text, setText] = useState({email:"",password:""})
  const handlechange =(e)=>{

      setText({...text,[e.target.name]:e.target.value})

  }
 const handleClick=async(e)=>{
  toast.success("Login successfully !",{position:"top-center",theme: "dark",})
  e.preventDefault()
// login(text.email,text.password)

  const response = await fetch(`${api}/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({email:text.email,password:text.password})
  })
  const json=await response.json()
      console.log(json)
      if(json.success){
        localStorage.setItem("token",json.token)
        Navigate("/")
      }
    console.log(response)
    console.log("login successfully")
  
}
 
  return (
    <>
    <h1 className=' d-flex justify-content-center mt-5'><b>Login with Note-App</b> </h1>
      <div className={lgcss.loginbox}>
 <form>
   <div className={lgcss.userbox}>
     <input onChange={handlechange} type="text" id="email" value={text.email} name="email" required=""/>
     <label>Email</label>
   </div>
   <div className={lgcss.userbox}>
     <input onChange={handlechange} type="text" id="password" value={text.password} name="password" required=""/>
     <label>Password</label>
   </div><center>
   <a href="/" onClick={handleClick}>
          SEND
      <span></span>
   </a></center>
   <ToastContainer />

 </form>
</div>
    </>
  )
}

export default Login
