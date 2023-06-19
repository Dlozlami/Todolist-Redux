import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Header from './components/header';
import NoPage from "./pages/noPage";
import MyList from './pages/mylist';
import Register from './pages/register';
import { useState } from 'react';

export default function App() {

  const [userProfile,setUserProfile] = useState({
      id: "",
      password: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      list: []
    });

  return (
    <main>
      <Routes>
        <Route path="/" element={<Header userProfile={userProfile} setUserProfile={setUserProfile}/>}>
          <Route index element={<Home userProfile={userProfile} setUserProfile={setUserProfile}/>} />
          <Route path="Register" element={<Register userProfile={userProfile} setUserProfile={setUserProfile}/>} />
          <Route path="Login" element={<Login userProfile={userProfile} setUserProfile={setUserProfile}/>} />
          <Route path="ToDoList" element={
            userProfile?
            <MyList  userProfile={userProfile} setUserProfile={setUserProfile}/>
            :
            <Navigate to="/"/>
          } />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  </main>
  );
}