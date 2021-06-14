const { isValidObjectId } = require('mongoose');

const mongoose = require('mongoose');

/*
    ==============
     DESCRIPTION
    ==============
    This script holds the schema database model for the keyword dictionaries.
    
*/

const KeywordSchema = new mongoose.Schema({
    //     post_ID:{
    //       type: String,
    //       default: ''
    //   },
    keyword: {
        type: String,
        default: ''
    },

    postsArray: [{
        type: String
    }],



});

module.exports = mongoose.model('Category_Object', KeywordSchema);