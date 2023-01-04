import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader  from "../assets/loader.gif"
import '../styles/register.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { setAvatarRoute } from "../utils/APIRoutes";
import {Buffer} from 'buffer';
import '../styles/setAvatar.css'


const Container = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column ;
gap :3rem;
height : 100vh;
width : 100vw;
background-color : #131324;
`

function SetAvatar() {

  const navigate = useNavigate()

  const [avatars, setAvatars] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  
  const api = "https://api.multiavatar.com/45678945";

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  // phải login mới chọn đc ảnh
  useEffect( () => {
    if(!localStorage.getItem("chat-app-user")){
      navigate('/login')
    }
  }, [])

  const setProfilePicture = async () => {
    if(selectedAvatar === undefined){
      toast.error("please select an avatar" , toastOptions);
    }else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"))
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image : avatars[selectedAvatar]
      })

      console.log('============= data',data)
      console.log('============= data.isSet',data.isSet)

      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user))
        navigate('/')
      }else{
        toast.error("Error setting avatar .Plase try again" , toastOptions)
      }
    }
  }

  useEffect(  () => {
    const fetch = async () => {
      const data = []
      for(let i = 0 ; i < 4 ; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        // image.data trả về 1 thẻ svg
        // Buffer để lưu trữ dữ liệu thô thành các mảng số nguyên tố tương ứng với việc cấp phát bộ nhớ heap V8 (vùng nhớ).
        const buffer = new Buffer(image.data)

        // biến mã hoá thành chuỗi kí tự base64 để render ra image
        data.push(buffer.toString("base64"));
      }
      
      setAvatars(data);
      setIsLoading(false);
    }
    fetch()
  } , [])
  
  return (
    <>
    {
      isLoading ? <Container>
        <img src={loader} alt="" className="loader" />
      </Container> :
       <Container>

       <div className="title-container">
         <h1>
           Pick an avatar as your profile
         </h1>
       </div>
 
       <div className="avatars">
         {avatars.map((avatar , index) => {
           return (
             <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ""}`}>
                <img
                 // ảnh base64
                     src={`data:image/svg+xml;base64,${avatar}`}
                     alt="avatar"
                     key={avatar}
                     onClick={() => setSelectedAvatar(index)}
                   />
             </div>
           )
         })}
       </div>
 
       <button className="submit-btn" onClick={() => setProfilePicture()}>Set as Profile Picture</button>
     </Container>
    }
    <ToastContainer />
    </>
  )
}

export default SetAvatar