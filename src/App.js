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
  const [user,setUser] = useState(null);
  return (
    <main>
      <Routes>
        <Route path="/" element={<Header user={user} setUser={setUser}/>}>
          <Route index element={<Home user={user} setUser={setUser}/>} />
          <Route path="Register" element={<Register user={user} setUser={setUser}/>} />
          <Route path="Login" element={<Login user={user} setUser={setUser}/>} />
          <Route path="ToDoList" element={
            user?
            <MyList  user={user} setUser={setUser}/>
            :
            <Navigate to="/"/>
          } />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  </main>
  );
}