import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css'
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { loginRoute } from "../utils/APIRoutes";
import '../styles/register.css'

function Login() {
    const navigate = useNavigate()

    const [values , setValues] = useState({
        username : '',
        password : '',
    })

    useEffect(() => {
      if(localStorage.getItem("chat-app-user")){
         navigate('/')
      }
    }, [])

  const handleSubmit = async (e) => {

    e.preventDefault();
    if(handleValidate()){
        const {password , username } = values;

     const {data} =  await axios.post(loginRoute , {
              password  , username 
      })

      console.log('============= data',data)


      if(data.status === false){
            toast.error(data.msg , toastOptions)
        }

        if(data.status === true){
            localStorage.setItem('chat-app-user' , JSON.stringify(data.userCheck))
            navigate('/')
        }

    }
  };

  const toastOptions = {
    position: "right-top",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  const handleValidate = (e) => {
    const {password  , username } = values;

    if(password === ""){
        toast.error(" password is required " , toastOptions)
        return false;
    }else if(username.length  === ""){
        toast.error(" Username is required" ,toastOptions)
        return false;
    }
    return true;
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name] : e.target.value});
  }

  return (
    <>
      <div className="l-container">
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
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

         
          <button type="submit"> Login in</button>

          <span>Don't have an account? <Link to = "/register" >Register</Link></span>

        </form>
      </div>
      <ToastContainer 
      position="bottom-top"
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

export default Login