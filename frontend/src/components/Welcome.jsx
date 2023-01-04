import React from 'react'
import styled from 'styled-components'
import '../styles/welcome.css'
import Robot from '../assets/robot.gif'

function Welcome({currentUser}) {
  // user hiện tại 
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>Welcome , <span>{ currentUser ? currentUser.username : '' }</span></h1>
      <h3>Please select a chat to start messaging </h3>
    </Container>
  )
}

const Container = styled.div`
display : flex ;
justify-content : center;
align-items : center;
flex-direction : column;
color : white;
`

export default Welcome
