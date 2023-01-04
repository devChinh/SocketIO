import React from 'react'
import Logo from '../assets/logo.svg'
import landingImage from '../assets/landing-image.jpg'
import '../styles/landingPage.css'
import {Link} from 'react-router-dom'

const LandingPage = () => {
  return (
    <section className="landing-container">
        <div className="landing-header-desktop">
            <img src={Logo} alt="Logo" />
            <h1>ChatC</h1>
        </div>
        <img src={landingImage} alt="landingImage" />
        <div className="not-available">Not available on Mobile yet</div>
         <Link to="/chat" >
         <button>
           start chatting
        </button>
         </Link>
    </section>
  )
}

export default LandingPage