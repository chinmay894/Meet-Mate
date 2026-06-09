const cors =require("cors")   //  to bypass the choromes safty manual , allow two websites for communication  sitting at different ports 

const express = require("express")
const app =express() 
// we have an server application/obj  ready now

//third party npm packages must put on top   / dependancies 



const{ Client } = require("pg") // we want blueprint of only client from pg --client is a middlemen between express and data (js--client--sql)
// lets makw the real working object of client   with attribute  
//attributes make a client special
const client = new Client({
  host: "localhost",
  port: 5432,
  database: "meetmate",
  user: "postgres",
  password: "root1174"
});
// the object we passed to the client  is called  configeration  (student--meetmate employee)
// now we have the client object ready to use


client.connect() // mean we sent a request fo connection to the database , which might take time ,  promise is created 
.then(()=>{console.log("databse connected ");}) // run this code if request succeeded
.catch((err)=>{console.log(err);});


app.use(cors());
app.use(express.json());  // before intering post,get route  we wnat our req object ready  we need to convert the strign into obj



//route1  -- for root route // access the home page 
app.get("/",function(req,res){   // "/"  is request and function is a what action to perform for that request
  res.send("welcome to the meetmate backend ")
  console.log(req.url)
})

//route2 to accept the data from react and print in terminal then give a response 

app.post("/profile",async function(req,res){
  // till this process we are ready with the req.body , now we just need to send data to the database wi the help of the client 
  // instead of doing req.name, req.email ... lets simplify things by deconstructing 
  const {name,interest,learning,email}=req.body;
  const sql=`INSERT INTO users(name,interest,learning,email) VALUES ($1,$2,$3,$4) `
  const values =[name,interest,learning,email];
  
  // we must put that code in try block  which can cause error 
  try{
  await client.query(sql,values)
   
   res.send("data received successfully , you are on profile page") 
  }
  catch(err){
      console.log(err);
      console.log("failed to save data ")
      res.send("error:cant save data right now ")
  }
});

app.listen(3000) // who ever will come to port 3000 with the request of /(home page or entry point)  give this response to him 
//who ever try to reaach at http//localhost3000  he will get this response 

