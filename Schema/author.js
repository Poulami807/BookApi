//mongoose
const mongoose=require('mongoose');

//Schema
const AuthorSchema=mongoose.Schema({
    id:{
       type: Number,
       required:true,
    },
    name:{
        type:String,
        required:true,
    },
    books:[String],
});

//Creating author model
const AuthorModel=mongoose.model("Authors",AuthorSchema);

//export
module.exports=AuthorModel;