import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


interface loginCardType {
  username: string;
  password: string;
}

function LoginCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  return(
    <div style={{width:'90vw',height:'80vh'}}>
        <div className=" w3-card-4 w3-round-large w3-white w3-display-middle" style={{padding:'20px',width:'30vw'}}>
            <h1 style={{fontWeight:'500'}} className="w3-text-blue">Login</h1>
            <div>
                <label htmlFor="id" >Username</label><br/> 
                <br /><br />
                <label htmlFor="id">Password</label><br />
                <input type="password" id="password"  className="w3-round"/>
                <br /><br />
              <button className="w3-btn w3-blue w3-card-4 w3-round-large" style={{marginRight:"2vw"}}>Log in</button> <button className="w3-btn w3-blue w3-card-4 w3-round-large" onClick={() => navigate('/Register')}>Register</button>
            </div>
        </div>
    </div>
);
}

export default LoginCard;