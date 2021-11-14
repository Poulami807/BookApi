//mongoose
const mongoose=require('mongoose');

//Schema
const BookSchema=mongoose.Schema({
    ISBN: {
        type: String,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

//Creating Book Model
const BookModel=mongoose.model("Books",BookSchema);

//Export
module.exports=BookModel;