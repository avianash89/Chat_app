import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = localStorage.getItem("chat-app-user");
        if (!storedUser) {
          throw new Error("User not found in local storage");
        }
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        setError(error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (!currentUser) return;
        if (!currentUser.isAvatarImageSet) {
          navigate("/setAvatar");
          return;
        }
        const response = await axios.get(`${allUserRoute}/${currentUser._id}`);
        setContacts(response.data);
      } catch (error) {
        setError("Error fetching contacts");
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [currentUser, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
