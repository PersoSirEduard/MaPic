const mongoose = require('mongoose');

/*
    ==============
     DESCRIPTION
    ==============
    This script holds the schema database model for posts.
    
*/

const PostSchema = new mongoose.Schema({

    postID: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    },

    title: {
        type: String,
        default: ''
    },

    /*
    !!! KEYWORD LIST STRING FORMAT !!!
    
    keyword 1:34,keyword2:55,keyword3:66
    */

    keywordListString: {
        type: String,
        default: ''
    },

    /*
    !!! LOCATION STRING FORMAT !!!
    
    123 John Street Waterloo ON
    
    123 John Street,Waterloo,ON
    
    */

    latitude: {
        type: Number,
        default: ''
    },

    longitude: {
        type: Number,
        default: ''
    }



});

module.exports = mongoose.model('Post_Object', PostSchema);