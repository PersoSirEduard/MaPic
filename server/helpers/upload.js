const { Storage } = require('@google-cloud/storage');
const random = require('random-string-generator');
const fs = require("fs");

/*
    ==============
     DESCRIPTION
    ==============
    This script uploads files to Google Cloud Storage bucket.
    
*/

const storage = new Storage({
    keyFilename: './server/helpers/google_keys/google_storage_api_key.json'
}); // Google Cloud storage

const bucketName = "mapic_posts"; // Cloud storage bucket name

async function uploadToStorage(base64_img) { // Upload image as base64 and return url

    return new Promise(async (resolve, reject) => {

        var fileName = random('alphanumeric') + ".jpg";

        var buffer = base64_to_buffer(base64_img);


        const bucket = storage.bucket(bucketName);
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        var publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`; // Generate public url
        blobStream.on('finish', () => {
            console.log("Uploaded the image successfully.");
            resolve(publicUrl);
        })
            .on('error', (err) => {
                console.log("Unable to upload image, something went wrong", err);
                reject(err);
            })
            .end(buffer)
    });
}

function base64_to_buffer(base64_string) {
    return Buffer.from(base64_string, "base64");
}


module.exports = { uploadToStorage, base64_to_buffer }