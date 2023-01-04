import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg"
import '../styles/register.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes";


function Register() {

    const navigate = useNavigate()

    const [values , setValues] = useState({
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidate()){
        const {password , confirmPassword , username , email} = values;

     const {data} =  await axios.post(registerRoute , {
              password , confirmPassword , username , email
      })
      
      if(data.status === false){
            toast.error(data.msg , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        if(data.status === true){
            localStorage.setItem('chat-app-user' , JSON.stringify(data.user))
            navigate('/')
        }

    }
  };

  const handleValidate = (e) => {
    const {password , confirmPassword , username , email} = values;

    if(password !== confirmPassword){
        toast.error(" password and confirm password should be same " , {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return false;
    }else if(username.length < 3){
        toast.error(" username should be than 3 characters" , {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return false;
    }else if( password.length < 8){
        toast.error("password should be than 8 characters" ,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        } )
        return false;
    }else if(email ===""){
        toast.error("email is required" , {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return false;
    }
    return true;
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name] : e.target.value});
  }


  return (
    <>
      <div className="r-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>ChatC</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit"> Create User</button>

          <span>Already have an account? <Link to = "/login" >Login</Link></span>

        </form>
      </div>
      <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    </>
  );
}


export default Register;
