//mongoose
const mongoose=require('mongoose');

//Schema
const PublicationSchema=mongoose.Schema({
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

//Creating Publication Model
const PublicationModel=mongoose.model( "Publications",PublicationSchema);

//export
module.exports=PublicationModel;