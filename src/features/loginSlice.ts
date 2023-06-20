import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const loginSlice = createSlice({
    name:"login",
    initialState:{
        username:'',
        password:''
    },
    reducers:{
        login: (state,action: PayloadAction<object>)=>{
            const navigate = useNavigate();
            
    
            axios.get("http://localhost:4000/accounts/dlozim")
                .then(function (result) {
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

})



export default loginSlice.reducer;