import {useEffect, useState} from "react";
import Profile from "./Profile"
import Login from "./Login"
import Home from "./Home"



function App() {

 

  const[activepage,setActivePage]=useState("Login")
  const[user,setUser]=useState({
    Email:"",
    Name:"",
    Interest:"",
    Learning:"",
    

  })


  useEffect(()=>{
    const data=localStorage.getItem("user")// retuns a strin stored under name of user (cause of stringify user obj is a string )
    if(data){
      const obj=JSON.parse(data)// user is a sting so we need to convert it back to obj , before starting the program cause user may try to acces the user.name 
      setUser(obj)
      console.log("data found ",obj)// will print a obj 
      
      // return(<Home />)// useeffect must not return aythin 
      setActivePage("home")
    }
    else
    console.log("effect exicuted,login required")
  },[]
  )
  function swap(){
    setActivePage("Profile")
  }

   function swap2(){
    setActivePage("Home")
  }

// function receive(eml){
//    setUser({...olddata,Email:eml})//  this way setuser dont dentify old data we have to pass it a function who will updae our emai;
//    console.log(user)
//   }  ///this will not work cause you are directly writing olddata in

function receive(label,eml){  //change eml to value
  setUser(    // here we want a function which will return an object 
    olddata=>({...olddata,[label]:eml}) // or =>{return {...olddata,Email:eml};}
  )
  
  console.log(label+"changed")

}
console.log("check user :",user)

function saveuser(copycard){
  localStorage.setItem("user",JSON.stringify(copycard))
  console.log("data stored in the local storage ,on click save ")
}

  if (activepage==="Login"){
    return(
      <Login swap={swap} receive={receive} />   // swap functiomn just passing the setactivepage in wrap 
    )
  }
  if(activepage==="Profile"){
    return(
      <Profile swap2={swap2}  receive={receive} saveuser={saveuser} user={user}/>
    )
  }


  return (
    <Home />
 )

}

export default App
