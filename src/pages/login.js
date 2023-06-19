import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login({ user, setUser}){

    const navigate = useNavigate();
    const [validPwd,setValidPwd] = useState(true);
    const [validUsername,setValidUsername] = useState(true);

    const login = ()=>{
        let userId = document.getElementById("id").value;
        let pwd = document.getElementById("password").value;

        axios.get("http://localhost:4000/accounts/"+userId)
            .then(function (result) {
            result.data.password===pwd?setValidPwd(true):setValidPwd(false);
            if(result.data.password===pwd){
                setUser(result.data);
                localStorage.setItem("userData",result.data);
                navigate('/ToDoList');
            }
          })
          .catch(function (error) {
            console.log(error);
            setValidUsername(false);
          });
    }

    if(user){
        return(
            <div style={{width:'90vw',height:'80vh'}}>
                <div className=" w3-card-4 w3-round-large w3-white w3-display-middle" style={{padding:'20px',width:'30vw'}}>
                    <h1 style={{fontWeight:'500'}} className="w3-text-blue">Welcome, {user.name}</h1>
                    <button className="w3-btn w3-blue w3-card-4 w3-round-large" onClick={() => {setUser(null)}}>log out</button>
                </div>
            </div>
        );
    }
    return(
        <div style={{width:'90vw',height:'80vh'}}>
            <div className=" w3-card-4 w3-round-large w3-white w3-display-middle" style={{padding:'20px',width:'30vw'}}>
                <h1 style={{fontWeight:'500'}} className="w3-text-blue">Login</h1>
                <div>
                    <label htmlFor="id" >Username</label><br />
                    <input type="text" id="id" className="w3-round"/> {validUsername?'':<span className="w3-red">Invalid username</span>}
                    <br /><br />
                    <label htmlFor="id">Password</label><br />
                    <input type="password" id="password"  className="w3-round"/>{validPwd?'':<span className="w3-red">Invalid username</span>}
                    <br /><br />
                    <button className="w3-btn w3-blue w3-card-4 w3-round-large" onClick={login} style={{marginRight:"2vw"}}>Log in</button> <button className="w3-btn w3-blue w3-card-4 w3-round-large" onClick={() => navigate('Register')}>Register</button>
                </div>
            </div>
        </div>
    );
}