import { useState } from "react";
import "./home.css"
function Home(props){
    const[search ,setsearch]=useState("");
    // const[interestedusers,setinteresteduser]=useState([]);
    // const[learningusers,setlearninguser]=useState([]);
    const [results,setresults]=useState({
        profiles:[],
        community:[]
    });
    
    async function search_button(){
            console.log("search clicked")
        
        //    setinteresteduser([{name:"chinmayy"},{name:"virat"},])
        //    setlearninguser([{name:"rohit"}])
        try{
         const response = await fetch(`http://localhost:3000/search?term=${search}`)  //returns an wrapper object , which contains metadata plus two arrays
         const cleanresponse= await response.json();// now we have a redy to use object , which stores the two arrays 

        // to access name of every profile or name of the every id we have to iterate through all objects inside the array and print the .name of all , forEach(profile.name) of  to print get the name of the first profile in the array profiles[0].name 
            setresults(cleanresponse)
            // we have a object  stored in result which contains two arrays 

        }
        catch{
           console.log("request failed ")
        }
        }



    return(<>
        <h1 class="heading">MeetMate</h1>
        <div class="srh_box">
         <input class ="srh_in" type="text" placeholder="search for the topic" value={search} onChange={(e)=>{
            setsearch(e.target.value)  // check what is inside the input box  assign it to the search 
         }} onKeyDown={(e)=>{if (e.key==="Enter"){search_button()}}}></input>   
         
          {/* //value={search} is just to manintain the chrome and react synchronised */}
        {/* <h1>{search}</h1> */}

       

        <button class="srhbtn" onClick={search_button}>🔎</button></div>
           {results.profiles.length>0 || results.community.length>0 ?(
             <>
            {results.profiles.map((result)=>{
                return(
               <div  onClick={()=>{props.swap2("Connect")}}className="prof">
               <h2>{result.name}</h2>
                    <p>{result.interest}</p>
                    <p>{result.learning}</p>
                </div>
                
                )               
            })}
            {results.community.map((commu_)=>{
                return(
                    <div class="commu_ty">
                        <h2 onClick={()=>{props.swap2("Feed")}}>#{commu_.community_name}</h2>
                        <p>{commu_.description}</p>
                    </div>
                )
            })}
           </>
           ):(
            null
            )}
           
           
            {/* <div class="commu_ty"> */}
                {/* <h2 onClick={()=>{
                    //fetch the community from the database
                    //fill it in the community 
                    //use community.length>0 if ,if yes then show the community.name ,  when clicked on the name  then open the main feed 
                }}>{community}</h2> */}
                {/* <h2>#community</h2> */}
            {/* </div> */}
    

       {/* space were prifiles will be shown 
       which can be scrolled down  */}
       {/* just put the array of the objects [{},{}] */}
    
</>)}
export default Home