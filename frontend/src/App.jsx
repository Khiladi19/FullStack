import React from "react";
import { BrowserRouter,Routes,Route} from "react-router";
import "./App.css";
import Home from "./Home";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import ProfilePage from "./pages/ProfilePage";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<RegisterForm/>} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/profile" element={<ProfilePage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
