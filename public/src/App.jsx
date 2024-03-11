import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvater from "./pages/SetAvater";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element = {<Register/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/setAvatar" element = {<SetAvater/>} />
        <Route path="/" element = {<Chat/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
