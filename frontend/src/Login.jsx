import Profile from "./Profile.jsx"
import App from "./App.jsx"
import "./home.css"
import { useState } from "react";
function Login(props){
    const[useremail,setUserEmail]=useState("")
    return(<>
        <h1 >login page</h1><br></br>
         <div className="logbox">
        <input class="login" type ="email" placeholder="enter your email:" onChange={(e)=>{
            setUserEmail(e.target.value)
        }}></input>

        <button class="logbtn" onClick={()=>{
            console.log("submit clicked");
            console.log(useremail)
            props.swap()
            props.receive("Email",useremail)
           
            

        }}>Log in </button>
        </div>
    </>)
}
export default Login 