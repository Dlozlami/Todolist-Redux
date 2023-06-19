import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username:'',
    password:''
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        login: ()=>{
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

});



export default loginSlice.reducer;