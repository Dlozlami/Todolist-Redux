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

  return (
    <main>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<Home/>} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login/>} />
          <Route path="ToDoList" element={<MyList />}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  </main>
  );
}