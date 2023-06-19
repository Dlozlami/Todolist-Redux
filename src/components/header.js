import { Outlet, Link } from "react-router-dom";

export default function Header(){
    return(
        <>
        <nav>
            <div style={{width:'50vw',fontSize:'2.5em',color:'white'}}>&#128462;</div>
            <button className="w3-btn w3-border w3-border-white w3-card-4 w3-round-large" style={{color:'white'}}>
              <Link to="/">Home</Link>
            </button>
            <button className="w3-btn w3-border w3-border-white w3-card-4 w3-round-large" style={{color:'white'}}>
              <Link to="/login">Log In</Link>
            </button>
            <button className="w3-btn w3-border w3-border-white w3-card-4 w3-round-large" style={{color:'white'}}>
              <Link to="/register">{user?'Update Profile':'Register'}</Link>
            </button>
            <button className="w3-btn w3-border w3-border-white w3-card-4 w3-round-large" style={{color:'white'}}>
              <Link to="/todolist">To Do List</Link>
            </button>
        </nav>
  
        <Outlet />
      </>
    );
}