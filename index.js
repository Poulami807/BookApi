// import
const express=require("express");
const mongoose=require('mongoose');
require('dotenv').config();

// initialising express
bookApi=express();

// instance of Database.js 
// const Database=require("./database");

//importing APIs
const Book=require("./API/book");
const Author=require("./API/author");
const Publication=require("./API/publication");

// Connecting to mongoDb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connection established!"))
    .catch((err) => {
        console.log(err);
    });

bookApi.use(express.json());
bookApi.use("/book",Book);
bookApi.use("/author",Author);
bookApi.use("/publication",Publication);

bookApi.get("/",(req,res)=>{
      res.json({message:"Server is working"});
});

bookApi.listen(4000, ()=>console.log("Server is running"));
