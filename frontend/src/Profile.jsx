import { useState } from "react";



function Profile(props){
    const[card,setCard]=useState({
        name:"",
        interest:"",
        learning:""
    });
//defining vcriables separatly  is a easy method actually instind of a object containing all 

    // instead of initialixing all the variables , this way we can initialis all the variables at starting , set ot ""

    
    return(<>
        <h1>profile page</h1><br></br>
        <label>Name:</label>
        <input type="text" placeholder="enter username" value={card.name} onChange={(e) => setCard(previous => ({ ...previous, name: e.target.value }))} ></input>
        {/* //<input type="text" placeholder="enter username" onChange={(e)=>setName(e.target.value)}  // this  when you defined variable as const[name,setName]... */}
        <label>interests:</label>
        <input type="text" placeholder="enter your interest" value={card.interest} onChange={(e) => setCard(previous => ({ ...previous, interest: e.target.value }))} ></input>
        <label>now learning:</label>
        <input type="text" placeholder="now learning:" value={card.learning} onChange={(e) => setCard(previous => ({ ...previous, learning: e.target.value }))} ></input>
        <button onClick={()=>{
            console.log("clicked2");
            
            props.swap2()
            props.receive("Name",card.name)
            props.receive("Interest",card.interest)
            props.receive("Learning",card.learning)
            //as js is behaving asyncronous   so it takes time to update user profile , direct calling  saveuser can only save half values 
            const fulldata={...card,email:props.user.Email}  // we need to create this copy cause receive fxnn taking time to update the profile and as we have saveuser() ,just nest to receive , so js is jumping to saveuser with haed user update , so saveuser storing only email 
            props.saveuser(fulldata)    // later maybe we need to shift saveuse(fulldata) to saveuser(user) the actual user profile ,
            // this is when user creats profile for first time , later when user wans to upate profile ,.....maybe we need to work with real user or maybe not
         //  ----- lets do backedn work ,, lets send request to the express to please save this data in the database---//
             const finaldata=JSON.stringify(fulldata)
         fetch("http://localhost:3000/profile",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:finaldata
         }) 
        }}>save</button>
        {/* <p>{card.interest}</p>
        <p>{card.name}</p> */}
    </>)
}
export default Profile