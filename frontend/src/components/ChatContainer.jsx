import React, { useState } from "react";
import styled from "styled-components";
import "../styles/chatContainer.css";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { getAllMessageRoute } from "../utils/APIRoutes";
import { useEffect } from "react";
import { useRef } from "react";
import {v4 as uuidv4} from 'uuid'

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const scrollRef = useRef();
  
  useEffect(() => {
    if (currentChat) {
      const fetch = async () => {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser && currentUser._id,
          to: currentChat && currentChat._id,
        });
        setMessages(response.data);
      };
      fetch();
    }
  }, [currentChat]);

  console.log('============= messages ',messages )

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    // socket connection

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  console.log('============= messages',messages)

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log('============= msg',msg)
        setArrivalMessages({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    scrollRef.current &&
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${
                    currentChat ? currentChat.avatarImage : ""
                  }`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat ? currentChat.username : ""}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef}  key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">{message.message}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
`;

export default ChatContainer;
