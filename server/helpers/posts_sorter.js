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
async function post_array_sort(posts_array, keyword, userLat, userLong) {
    let post_object_list_with_weights = [];

    // console.log("Posts array length: " + posts_array.length);
    // console.log(posts_array);

    for (let post_id of posts_array) {
        // console.log('Post id to search:' + post_id)
        let post_with_weight = await getPost(post_id, keyword, userLat, userLong);
        post_object_list_with_weights.push(post_with_weight);
    }

    let sorted_posts = arraySort(post_object_list_with_weights, 'weight'); // Sort weight ascending order
    return sorted_posts;
}

async function getPost(post_id, keyword, userLat, userLong) {
    return new Promise((resolve, reject) => {
        Post_Object.findOne({ 'post_ID': post_id }, {}, function (err, postObj) {
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
    // console.log(`Distance: ${distance}`)
    let score;
    let post_keyword_string = post.keywordListString

    // console.log("Post keyword string: " + post_keyword_string)
    let post_keyword_array = post_keyword_string.split(",");

    // console.log("Post keyword array: " + post_keyword_array)

    for (let element of post_keyword_array) {
        let split_element = element.split(":");
        if (split_element[0].toLowerCase() == keyword.toLowerCase()) {
            score = parseFloat(split_element[1]);
            break;
        }

    }
    // console.log(`Score: ${score}`)
    return (1 - score) * distance / 1000;
}

module.exports = { post_array_sort }