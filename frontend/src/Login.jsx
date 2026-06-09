import Profile from "./Profile.jsx"
import App from "./App.jsx"
import { useState } from "react";
function Login(props){
    const[useremail,setUserEmail]=useState("")
    return(<>
        <h1 >login page</h1><br></br>
        <input type ="email" placeholder="enter your email:" onChange={(e)=>{
            setUserEmail(e.target.value)
        }}></input>

        <button onClick={()=>{
            console.log("submit clicked");
            console.log(useremail)
            props.swap()
            props.receive("Email",useremail)
           
            

        }}>Log in </button>
        
    </>)
}
export default Login 