import axios from "axios";
import React, { useState } from "react";


export default function Register(){
  
  const [userAdded,setUserAdded] = useState(false);
  const [isRegisterBtnShowing,setIsRegisterBtnShowing] = useState(true);

  //eslint-disable-next-line
  const [account,setAccount] = useState(null);

  const checkUsername = (event)=>{
    console.log(event.target.value)
    /*axios.get("http://localhost:4000/accounts/rtf44rrg")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });*/
  }

  //eslint-disable-next-line
  const [inputValues, setInputValues] = useState({
    id:"",
    password: "",
    name:"",
    surname: "",
    email: "",
    phone: "",
    list:[]
  });

  const add = () => {
    setIsRegisterBtnShowing(false);
    const updatedInputValues = {
      id:document.getElementById("id").value,
      password: document.getElementById("password").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      list:[]
    };

    setInputValues(updatedInputValues);

    axios.post("http://localhost:4000/accounts", updatedInputValues)
      .then(function (response) {
        console.log(response);
        setUserAdded(true);
        document.getElementById("id").value ="";
        document.getElementById("password").value ="";
        document.getElementById("name").value ="";
        document.getElementById("surname").value ="";
        document.getElementById("email").value ="";
        document.getElementById("phone").value ="";
        setIsRegisterBtnShowing(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="regContainer">
        <div className="formStyles w3-round-large  w3-card-4" >
        <h1 style={{fontWeight:'500'}} className="w3-text-blue">Registration</h1>
            <label htmlFor="id">Username</label>
            <input type="text" id="id" onChange={checkUsername}/>
            <br /><br />
            <label htmlFor="id">Password</label>
            <input type="password" id="password" />
            <br /><br />
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
            <br /><br />
            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" />
            <br /><br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <br /><br />
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" />
            <br /><br />
            {isRegisterBtnShowing?<button className="w3-btn w3-blue w3-card-4 w3-round-large"  onClick={add} >Register</button>:<button className="w3-btn w3-blue w3-card-4 w3-round-large"  onClick={add} disabled>Register</button> }
        </div>
        {userAdded?<div className="w3-panel w3-green w3-round-small">'You have registered successfully!'</div>:''}
    </div>
  );
}
