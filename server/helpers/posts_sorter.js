const Post_Object = require('../models/Post');
const geolib = require('geolib');
var arraySort = require('array-sort');

/*
    ==============
     DESCRIPTION
    ==============
    This script seaches keyword disctionaries to extract maxAmount of posts and sort them based on distance and relevance.
    
*/

// Takes in an array of post ID strings and returns a new array of them sorted by the relevance of the keyword
async function sortPosts(posts_array, keyword, userLat, userLong) {
    let post_object_list_with_weights = [];


    for (let post_id of posts_array) {
        
        let post_with_weight = await getPost(post_id, keyword, userLat, userLong);
        post_object_list_with_weights.push(post_with_weight);

    }

    let sorted_posts = arraySort(post_object_list_with_weights, 'weight'); // Sort weight ascending order
    return sorted_posts;
}

async function getPost(post_id, keyword, userLat, userLong) {

    return new Promise((resolve, reject) => {

        Post_Object.findOne({ 'postID': post_id }, {}, function (err, postObj) {

            let weight = calculate_weight(postObj, keyword, userLat, userLong);
            resolve({ 'post': postObj, 'weight': weight });

        });

    });

}

function calculate_weight(post, keyword, userLat, userLong) { // Calculate sorting weight (smaller weight is better)
    var distance = geolib.getDistance(
        { latitude: userLat, longitude: userLong },
        { latitude: post['latitude'], longitude: post['longitude'] }
    );

    let score;
    let post_keyword_string = post.keywordListString

    let post_keyword_array = post_keyword_string.split(",");


    for (let element of post_keyword_array) {
        let split_element = element.split(":");
        if (split_element[0].toLowerCase() == keyword.toLowerCase()) {
            score = parseFloat(split_element[1]);
            break;
        }

    }

    return (1 - score) * distance / 1000;
}

module.exports = { sortPosts }