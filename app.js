const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();

//  for use of static file in our server
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const Fname=req.body.fName;
  const Lname=req.body.lName;
  const email=req.body.email;
  console.log(Fname,Lname,email);


  //  info regarding the  new member
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:Fname,
          LNAME:Lname,
        }
      }
    ]

  };
  const jsonData=JSON.stringify(data);


  const url="https://us12.api.mailchimp.com/3.0/lists/LIST-KEY";


  const options={
    method:"POST",
    auth:"Nitin:API-KEY"
  }


 const request=https.request(url,options,function(response)
{
  if(response.statusCode==200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else
  {
    res.sendFile(__dirname+"/failure.html");
  }
 response.on("data",function(data){
   console.log(JSON.parse(data));
 })
})

request.write(jsonData);
request.end();







});
app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(3000,function(){
  console.log("sever is running on port 3000");
})


//  mailchamp API key
// 8272f2b41bc37aa8c4a63755cf1a8da8-us12
// list id.
 // 60d5a9e13f
