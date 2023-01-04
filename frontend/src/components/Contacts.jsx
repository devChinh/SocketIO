import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import '../styles/contacts.css'

function Contacts({ contacts, currentUser , changeChat}) {

    // name và image của user hiện tại mới login 
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  // bộ chọn userchat
  const [currentSelected, setCurrentSelected] = useState(undefined);


  // set name và image của user hiện tại mới login
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  // thay đổi user chat
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="c-container">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ChatC</h3>
          </div>

          {/** render ra toàn bộ user */}
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  onClick={() => changeCurrentChat(index , contact)}
                  key={index}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>

                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>

                </div>
              );
            })}
          </div>

          {/** user vừa mới login */}
          <div className="current-user">
          <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${currentUserImage}`}
                      alt="avatar"
                    />
                  </div>

                  <div className="username">
                    <h2>{currentUserName}</h2>
                  </div>
          </div>
        </div>
      )}
    </>
  );
}


export default Contacts;
