const expressServerBase = "http://172.25.10.129:8080/";



export async function create_post_function(dataObject) {
  const url = expressServerBase + "api/posts/create_post";


  // Set variables for body JSON
  const user_name = dataObject.user_name;
  const image_blob = dataObject.image_blob;
  const title = dataObject.title;
  const latitude = dataObject.latitude;
  const longitude = dataObject.longitude;


  const data = {
    user_name: user_name,
    image_blob: image_blob
    title: title,
    latitude: latitude,
    longitude: longitude
  };

  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const returnData = await response.json();
  console.log("Create post request result:: " + JSON.stringify(returnData));

  return returnData; // parses JSON response into native JavaScript objects
}




export async function search_post_function(dataObject) {
  const url = expressServerBase + "api/posts/search_post";


  // Set variables for body JSON
  const keyword = dataObject.keyword;
  const latitude = dataObject.latitude;
  const longitude = dataObject.longitude;
  const maxPosts = dataObject.maxPosts;


  const data = {
    keyword: keyword,
    latitude: latitude
    longitude: longitude,
    maxPosts: maxPosts,
  };

  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const returnData = await response.json();
  console.log("Search post request result: " + JSON.stringify(returnData));

  return returnData; // parses JSON response into native JavaScript objects
}


/*
"""
Return Data:
{
"success": true,
"message": "Successful search query.",
"posts": [
  {
"title": "test post",
"user_name": "newUserdawd1231",
"url": "https://storage.googleapis.com/mapic_bucket/pBNnfARWI42C.jpg",
"latitude": 13.43534535,
"longitude": 14.54535345
},
  {
"title": "test post",
"user_name": "newUserdawd1231",
"url": "https://storage.googleapis.com/mapic_bucket/jTlXhLUvU8hB.jpg",
"latitude": 13.43534535,
"longitude": 14.54535345
},
  {
"title": "test post",
"user_name": "newUserdawd1231",
"url": "https://storage.googleapis.com/mapic_bucket/XKuJK9ha3ZKx.jpg",
"latitude": 13.43534535,
"longitude": 14.54535345
}
],
}
"""
export async function query_all_posts_function(dataObject) {
  const url = expressServerBase + "api/posts/query_all_posts";





  const data = {

  };

  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const returnData = await response.json();
  console.log("Search post request result: " + JSON.stringify(returnData));

  return returnData; // parses JSON response into native JavaScript objects
}





"""
Return Data:
{
"success": true,
"message": "Signed up",
"token": "609766217f776c49208d16d5"
}
"""
export async function registerFunction(dataObject) {
  const url = expressServerBase + "api/account/signup";

  const user = dataObject.userName;
  const email = dataObject.email;
  const password = dataObject.password;

  const data = {
    userName: user,
    password: password,
    email: email,
  };

  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const returnData = await response.json();
  console.log("Signup request result: " + JSON.stringify(returnData));

  return returnData; // parses JSON response into native JavaScript objects
}



"""
Return Data:
{
"success": true,
"message": "Valid sign in",
"token": "6097666e7f776c49208d16d6"
}
"""
export async function loginFunction(dataObject) {
  const url = expressServerBase + "api/account/signin";

  const email = dataObject.email;
  const password = dataObject.password;

  const data = {
    password: password,
    email: email,
  };

  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const returnData = await response.json();
  console.log("Login request result: " + JSON.stringify(returnData));

  return returnData; // parses JSON response into native JavaScript objects
}


"""
Return Data:
{
"success": true,
"message": "Good"
}
""
export async function verifyFunction(dataObject) {
  const url =
    expressServerBase + "api/account/verify?token=" + dataObject.token;

  const response = await fetch(url);
  const returnData = await response.json();
  console.log("Verify request result: " + JSON.stringify(returnData));

  return returnData; // parses JSON response into native JavaScript objects
}

"""
Return Data:
{
"success": true,
"message": "Good"
}
""
export async function logoutFunction(token) {
  token = token.slice(1, -1);
  console.log("In logout function token = " + token);
  const url = expressServerBase + "api/account/logout?token=" + token;
  console.log("URL: " + url);
  console.log("D");
  const response = await fetch(url);

  const returnData = await response.json();
  console.log("Logout request result: " + JSON.stringify(returnData));

  return; // parses JSON response into native JavaScript objects
}