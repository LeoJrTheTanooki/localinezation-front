import {
  IBlogItems,
  IMedia,
  ITranslationRequest,
  IToken,
  ITranslation,
  IUserData,
  IUserInfo,
} from "@/Interfaces/Interfaces";

const url = "https://localinazationapi.azurewebsites.net";
// const url = "http://localhost:5071"

let userData: IUserData;

export const getLoggedInUserData = async () => {
  const username = localStorage.getItem("username");
  if (!username) {
    console.error("Username is not available in localStorage.");
    return;
  }
  try {
    const res = await fetch(`${url}/User/GetUserByUsername/${username}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch user data: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
};

//This function helps to see if our user is logged in
export const checkToken = () => {
  let result = false;

  let lsData = localStorage.getItem("Token");

  if (lsData != null) {
    result = true;
  }
  return result;
};

// Sorting through DataServices

// 1- Add User
export const addUser = async (createdUser: IUserInfo) => {
  //we're using this fetch to make a POST Requst
  //We have to set the method to POST
  //we set the content type to application/ json to specifiy our json data format

  const res = await fetch(url + "/User/AddUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdUser),
  });
  //we need to check if our post was succesful

  if (!res.ok) {
    const message = "An error has occured " + res.status;
    throw new Error(message);
  }

  const data = await res.json();

  if (data == true) {
    console.log("you have succesfully created an account");
  } else {
    console.log("this account already exist");
  }
  return data;
};

/*

{                                                                         //
  "username": "Leo",                                                      //
  "password": "Leo"                                                       //
}                                                                         //

*/

// ---------------------------------------------------------------------------------------------------------
// 2-  User login
export const login = async (loginUser: IUserInfo) => {
  const res = await fetch(url + "/User/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginUser),
  });

  if (!res.ok) {
    const message = "An Error has occured " + res.status;
    throw new Error(message);
  }

  const data: IToken = await res.json();
  return data;
};

/*

{                                                                        //
  "username": "Leo",                                                     //
  "password": "Leo"                                                      //
}                                                                        //

*/

// ---------------------------------------------------------------------------------------------------------
// 3- Update user's credentials:
// Update account
export const updateCredentials = async (updatedUser: IUserInfo) => {
  const res = await fetch(url + "/User/UpdateCredentials", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  if (!res.ok) {
    const message = "An error has occured " + res.status;
    throw new Error(message);
  }
};

/*

{                                                                        //
  "id": 2,                                                               //provide user's id and change the rest
  "username": "Leo2",                                                    //
  "password": "Leo2"                                                     //
}                                                                        //

*/

// ---------------------------------------------------------------------------------------------------------
// 4- Add Media item; a user can add as many media-item as needed; (they are not "Requests" yet though):
// Submit a media
export const addMediaItem = async (Media: IMedia) => {
  const response = await fetch(`${url}/Media/AddMediaItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Media),
  });

  if (!response.ok) {
    throw new Error("Failed to submit media");
  }
  return await response.json();
};

/*

 {                                                                          //
    "userID": 2,                                                            //
    "title": "Leo's Title",                                                 //
    "coverArt": "conver image to string first and added here",              //
    "originalLanguage": "Spanish",                                          //
    "tags": "string",                                                       //
    "categories": "string",                                                 //
    "type": "Video",                                                        //
    "platform": "YouTube",                                                  //
    "isPublished": true,                                                    //
    "isDeleted": false                                                      //
  }                                                                         //

*/

// ---------------------------------------------------------------------------------------------------------
// 5- Get the media by User ID:
//Dashboard fetches ashur 05/06/2024
export const getMediaItemsByUserId = async (userId: number) => {
  const res = await fetch(url + "/Media/GetItemsByUserId/" + userId);
  const data = await res.json();
  return data;
};
// ---------------------------------------------------------------------------------------------------------
// 6- Filter by original language:
export const getItemsByOriginalLanguage = async (language: string) => {
  const res = await fetch(
    url + "/Media/GetItemsByOriginalLanguage/" + language
  );
  const data = await res.json();
  return data;
};

// ---------------------------------------------------------------------------------------------------------
// 7- GET published items:  according to  "isPublished": true, or false
export const getPublishedItems = async () => {
  const res = await fetch(url + "/Media/GetPublishedItems/");
  const data = await res.json();
  return data;
};

// https://localinazationapi.azurewebsites.net/Media/GetPublishedItems
// ---------------------------------------------------------------------------------------------------------
// 8- Update media item:

export const updateMediaItem = async (updatedUser: IUserInfo) => {
  const res = await fetch(url + "/User/UpdateMediaItem", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  if (!res.ok) {
    const message = "An error has occured " + res.status;
    throw new Error(message);
  }
};

/* 

{                                                                         //
    "id": 1,                                                              // Media item id
   "userID": 0,                                                           //
   "title": "Leo's updated",                                              //
   "coverArt": "conver image to string first and added here",             //
   "originalLanguage": "Spanish",                                         //
   "type": "Video",                                                       //
   "platform": "YouTube",                                                 //
   "isPublished": true,                                                   //
   "isDeleted": false                                                     //
}                                                                         //

*/

// ---------------------------------------------------------------------------------------------------------
// 9- GET all media items
// Fetch all media from the backend
export const getAllMediaItems = async (): Promise<IMedia[]> => {
  const response = await fetch(url + "/Media/GetAllMediaItems");
  if (!response.ok) {
    throw new Error("Failed to fetch media");
  }
  return await response.json(); //Returns a list of media
};
// ---------------------------------------------------------------------------------------------------------
// 10- Get Media item by Media-Id (requested by Leo)
export const getMediaItemsByMediaId = async (mediaId: number) => {
  const res = await fetch(url + "/Media/GetMediaItemById/" + mediaId);
  const data = await res.json();
  return data;
};
// ---------------------------------------------------------------------------------------------------------
// 11- To request a  Translation; you can add as many languages requests  as you like for each Media:
export const addTranslationRequest = async (request: ITranslationRequest) => {
  const response = await fetch(`${url}/Media/AddTranslationRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to submit request");
  }
  return await response.json();
};

/*

{
  "requestorUserId": 1,                                                 // Loged in user id
  "mediaId": 1,                                                         //
  "requestLanguage": "Spanish",                                         // "string"; i suggest to use dropdown options to input as string; or a text input field to put whatever text
  "requestName": "Main Menu Text",                                      // as explained in the previous zach text in the beginning of this chat
  "requestDialogue": "Start | Settings | Quit",                         // same: zach text earlier
  "requestReferences": [                                                // the following goes to defferent table; refere to zach for the purpose.. you can add as many objects as you like in this array
    {                                                                   //
      "src": "a string or /path/to/media",                              //
      "isVideo": false                                                  //
    },                                                                  //
{                                                                       //
      "src": "another string2",                                         //
      "isVideo": true                                                   //
    }                                                                   //
  ]                                                                     //
}                                                                       //

*/

// ---------------------------------------------------------------------------------------------------------
// 12-  add translations text; you can add as many translations languages or versions for each translation request submitted:
export const addTranslation = async (request: ITranslation) => {
  const response = await fetch(`${url}/Media/AddTranslation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to submit translation");
  }
  return await response.json();
};

/*

{                                                                         //
  "translationRequestId": 3,                                              // ID of the translation request
  "translatorUserId": 2,                                                  // Loged in User ID of the translator
  "translatedText": "Lorem Emsom Translated text here",                   // The translation text
  "language": "Spanish",                                                  // The language of the translation
  "isApproved": true,                                                     // Whether the translation is approved
  "isGuest": false,                                                       // Whether the translator is a guest user
  "mediaId": 1                                                            //
}                                                                         //

*/

// ---------------------------------------------------------------------------------------------------------
// 13-  Get TranslationRequests By MediaId:
// Fetch translations
export const getTranslationRequestsByMediaId = async (mediaId: number) => {
  const res = await fetch(
    url + "/Media/GetTranslationRequestsByMediaId/" + mediaId
  );
  const data = await res.json();
  return data;
};

/*

[                                                                 //
  {                                                               //
    "id": 0,                                                      // id of the the TranslationRequests
    "requestorUserId": 8,                                         //
    "requestLanguage": "string: German",                          //
    "requestName": "string",                                      // per Zach request //requestName is the name of the piece of the media to be translated (I.E. "Main Menu Text" for a video game);
    "requestDialogue": "string",                                  // per Zach request //requestDialogue is the text from that piece (I.E. "Start | Settings | Quit"). This should be optional in case the user only has an   image/video available.
    "media": {                                                    // the media here is for confirmation purposes to make sure you are getting the right data (i can remove this if you want)
      "id": 0,                                                    //this is Media Id
      "title": "string"                                           // Media Title
    },                                                            //
    "requestReferences": [                                        // per Zach request:  //requestReferences is what is being used to show the piece to be translated. (see Zach original explanation in the beginning of this chat
      {                                                           //
        "src": "string",                                          //
        "isVideo": true                                           //
      }                                                           //
    ]                                                             //
  }                                                               //
]                                                                 //

*/

// ---------------------------------------------------------------------------------------------------------
// 14- Get Translations By Request Id:
export const getTranslationsByRequestId = async (requestId: number) => {
  const res = await fetch(
    url + "/Media/GetTranslationsByRequestId/" + requestId
  );
  const data = await res.json();
  return data;
};

/*

[                                                                           //
  {                                                                         //
    "id": 3,                                                                // id of the translation
    "translationRequestId": 3,                                              //
    "translatorUserId": 2,                                                  //
    "translatedText": "Lorem Emsom Translated text here",                   //
    "isApproved": true,                                                     //
    "language": "Spanish",                                                  //
    "isGuest": false                                                        //
 }                                                                          //
]                                                                           //

*/

// ---------------------------------------------------------------------------------------------------------
// 15- Get Translations By Translator User ID:
export const getTranslationsByTranslatorUserId = async (userId: number) => {
  const res = await fetch(
    url + "/Media/GetTranslationsByTranslatorUserId/" + userId
  );
  const data = await res.json();
  return data;
};

/*

response body:
[                                                                   //
  {                                                                 //
    "id": 3,                                                        // id of the translation
    "translationRequestId": 3,                                      //
    "translatorUserId": 2,                                          //
    "translatedText": "Lorem Emsom Translated text here",           //
    "isApproved": true,                                             //
    "language": "Spanish",                                          //
    "isGuest": false                                                //
 }                                                                  //
]                                                                   //

*/

// ---------------------------------------------------------------------------------------------------------
// 16- GET Translation Requests by User Id
export const getTranslationRequestsByUserId = async (userId: number) => {
  const res = await fetch(
    url + "/Media/GetTranslationRequestsByUserId/" + userId
  );
  const data = await res.json();
  return data;
};

// 17- GET Translations by MediaId
export const getTranslationsByMediaId = async (mediaId: number) => {
  const res = await fetch(url + "/Media/GetTranslationsByMediaId/" + mediaId);
  const data = await res.json();
  return data;
};

// 18- this endpoint is to search/GET a user by username
export const getUserByUsername = async (username: string) => {
  const res = await fetch(url + "/User/GetUserByUsername/" + username);
  const data = await res.json();
  return data;
};

// 19- this endpoint is to search/GET a user by UserId
export const getUserByUserId = async (userId: number) => {
  const res = await fetch(url + "/User/GetUserByUserId/" + userId);
  const data = await res.json();
  return data;
};

/* 
How to get Translations

Description by Zach:
So you -> Post addTranslation with a requestID -> Call all requests on the media page with getTranslationsbyMediaID by passing in the mediaID -> When you click on a request you call getTranslationsbyRequestID and pass in the ID of the request you clicked.

In Postman Chain Terms:
POST Point #12 with translationRequestId -> GET Point #17 by passing mediaId -> GET Point #14 with requestId

*/
