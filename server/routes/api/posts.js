const { uploadToStorage } = require("../../helpers/upload");
const { generateKeywords } = require("../../helpers/keywords");
const random = require("random-string-generator");
const Category_Object = require("../../models/Category_Object");
const Post_Object = require("../../models/Post");
const { sortPosts } = require("../../helpers/posts_sorter");
const { verifySession } = require('../../helpers/credentials');

/*
    ==============
     DESCRIPTION
    ==============
    This script handles the creation and search of posts.

    -> POST './api/posts/search_post/': {
        keyword: (String),
        longitude: (Long),
        latitude: (Long),
        maxPosts: (Int)
      }

    -> POST './api/posts/create_post/': {
        userName: (String),
        image_blobL (Base64 String),
        title: (String),
        latitude: (Long),
        longitude: (Long)
      }
    
*/

module.exports = async app => {

  /*
    Find the right posts in the database
  */

  app.post("/api/posts/search_post", async (req, res, next) => {

    const { body } = req;
    const { keyword, longitude, latitude, maxPosts } = body;

    if (!keyword) { // Verify if keyword exists
      return res.send({
        success: false,
        message: "Error: Keyword cannot be blank"
      });
    }
    if (!longitude || !latitude) { // Verify if both longitude and latitude exist
      return res.send({
        success: false,
        message: "Error: Location cannot be blank"
      });
    }
    if (!maxPosts) {  // Verify if max posts exists
      return res.send({
        success: false,
        message: "Error: Max posts cannot be blank"
      });
    }

    Category_Object.findOne({ keyword: keyword.toLowerCase() }, {}, async function (err, keyword_result) {
      // Search for keyword_object

      if (keyword_result == null) {

        // Category with a keyword was not found
        return res.send({
          success: false,
          message: "No posts were found.",
          posts: []
        });

      } else {

        // Found
        let posts = keyword_result.postsArray; // Post IDs array

        let sortedPosts = await sortPosts(posts, keyword, latitude, longitude);

        // Get max posts
        let return_array = []
        let current_index = 0
        for (let element of sortedPosts) {
          if (current_index > maxPosts) break;
          current_index += 1;

          let post = element.post;
          return_array.push({ "title": post.title, 'userName': post.userName, "url": post.imageUrl, "latitude": post.latitude, 'longitude': post.longitude })
        }

        return res.send({
          success: true,
          message: "Successful search query.",
          posts: return_array
        });

      }
    });
  });

  /*
   *Create a new post object in the database
  */
  
  app.post("/api/posts/create_post", verifySession, async (req, res, next) => {

    const { body } = req;
    const { imageBlob, title, latitude, longitude } = body;
    const session = req.session;

    if (!latitude) { // Verify if latitude exists
      return res.send({
        success: false,
        message: "Error: latitude is empty"
      });
    }
    if (!title) { // Vefify if title exists
      return res.send({
        success: false,
        message: "Error: title is empty"
      });
    }
    if (!longitude) { // Verify if longitude exists
      return res.send({
        success: false,
        message: "Error: longitude is empty"
      });
    }
    if (!session.userName) { // Verify if username exits
      return res.send({
        success: false,
        message: "Error: userName cannot be blank"
      });
    }
    if (!image_blob) { // Vefiy if Base64 image exists
      return res.send({
        success: false,
        message: "Error: imageBlob cannot be blank"
      });
    }

    const newPost = new Post_Object(); // New post object

    newPost.postID = random(20); // Random ID 
    newPost.userName = session.userName;
    newPost.imageUrl = await uploadToStorage(imageBlob); // Base 64 image string upload

    let keywordsString = await generateKeywords( // Find keywords for image
      newPost.imageUrl,
      newPost.postID
    );

    newPost.title = title;
    newPost.keywordListString = keywordsString;
    newPost.latitude = latitude;
    newPost.longitude = longitude;

    newPost.save((err, user) => {
      if (err) {
        
        return res.send({
          success: false,
          message: "Error: Server error"
        });

      }

      return res.send({
        success: true,
        message: "Post created"
      });

    });
  });

};
