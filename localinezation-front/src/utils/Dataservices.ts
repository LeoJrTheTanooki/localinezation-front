import {
  IBlogItems,
  IMedia,
  IToken,
  ITranslation,
  ITranslationRequest,
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
    localStorage.setItem("userId", data.userId);
    console.log("(dataservice.ts:75); Received data: ", data);
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
// ---------------------------------------------------------------------------------------------------------
// 5- Get the media by User ID:
//Dashboard fetches ashur 05/06/2024
export const getMediaItemsByUserId = async (userId: number) => {
  const res = await fetch(url + "/Media/GetItemsByUserId/" + userId);
  const data = await res.json();
  console.log("line 109: " + data);
  return data;
};
// ---------------------------------------------------------------------------------------------------------
// 6- Filter by original language:
export const getItemsByOriginalLanguage = async (language: string) => {
  const res = await fetch(
    url + "/Media/GetItemsByOriginalLanguage/" + language
  );
  const data = await res.json();
  console.log("line 109: " + data);
  return data;
};

// ---------------------------------------------------------------------------------------------------------
// 7- GET published items:  according to  "isPublished": true, or false
export const getPublishedItems = async () => {
  const res = await fetch(url + "/Media/GetPublishedItems/");
  const data = await res.json();
  console.log("line 109: " + data);
  return data;
};

// https://localinazationapi.azurewebsites.net/Media/GetPublishedItems
// _________________________________________________________________________________
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

//  {
//      "id": 1, //Media item id
//     "userID": 0,
//     "title": "Leo's updated",
//     "coverArt": "conver image to string first and added here",
//     "originalLanguage": "Spanish",
//     "type": "Video",
//     "platform": "YouTube",
//     "isPublished": true,
//     "isDeleted": false
//   }
// _________________________________________________________________________________
// 9- GET all media items
// Fetch all media from the backend
export const getAllMediaItems = async (): Promise<IMedia[]> => {
  const response = await fetch(url + "/Media/GetAllMediaItems");
  if (!response.ok) {
    throw new Error("Failed to fetch media");
  }
  return await response.json(); //Returns a list of media
};
// _________________________________________________________________________________
// 10- Get Media item by Media-Id (requested by Leo)
export const getMediaItemsByMediaId = async (mediaId: number) => {
  const res = await fetch(url + "/Media/GetMediaItemById/" + mediaId);
  const data = await res.json();
  console.log("line 109: " + data);
  return data;
};
// _________________________________________________________________________________
// 11- To request a  Translation; you can add as many languages requests  as you like for each Media:
export const addTranslationRequest = async (request: any) => {
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
// _________________________________________________________________________________
// 12-  add translations text; you can add as many translations languages or versions for each translation request submitted:
export const addTranslation = async (request: any) => {
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

// {
//   "translationRequestId": 3,  // ID of the translation request
//   "translatorUserId": 2, // Loged in User ID of the translator
//   "translatedText": "Lorem Emsom Translated text here", // The translation text
//   "language": "Spanish", // The language of the translation
//   "isApproved": true, // Whether the translation is approved
//   "isGuest": false // Whether the translator is a guest user
//   "mediaId": 1 //
// }

// _________________________________________________________________________________
// 13-  Get TranslationRequests By MediaId:
// Fetch translations
export const getTranslationRequestsByMediaId = async (mediaId: number) => {
  const res = await fetch(
    url + "/Media/GetTranslationRequestsByMediaId/" + mediaId
  );
  const data = await res.json();
  return data;
};

// _________________________________________________________________________________
// 14- Get Translations By Request Id:

// GET  https://localinazationapi.azurewebsites.net/Media/GetTranslationsByRequestId/{requestId}

export const getTranslationsByRequestId = async (requestId: number) => {
  const res = await fetch(
    url + "/Media/GetTranslationsByRequestId/" + requestId
  );
  const data = await res.json();
  return data;
};

// response body:
// [
//   {
//     "id": 3, //id of the translation
//     "translationRequestId": 3,
//     "translatorUserId": 2,
//     "translatedText": "Lorem Emsom Translated text here",
//     "isApproved": true,
//     "language": "Spanish",
//     "isGuest": false
//  }
// ]

// _________________________________________________________________________________
//
// _________________________________________________________________________________
// 15- Get Translations By Translator UserId:
export const getTranslationsByTranslatorUserId = async (userId: number) => {
  const res = await fetch(
    url + "/Media/GetTranslationsByTranslatorUserId/" + userId
  );
  const data = await res.json();
  return data;
};
// response body:
// [
//   {
//     "id": 3, //id of the translation
//     "translationRequestId": 3,
//     "translatorUserId": 2,
//     "translatedText": "Lorem Emsom Translated text here",
//     "isApproved": true,
//     "language": "Spanish",
//     "isGuest": false
//  }
// ]
// _________________________________________________________________________________
// 16- GET Translation Requests by User Id
export const getTranslationRequestsByUserId = async (userId: number) => {
  const res = await fetch(
    url + "/Media/GetTranslationRequestsByUserId/" + userId
  );
  const data = await res.json();
  return data;
};

// GET https://localinazationapi.azurewebsites.net/Media/GetTranslationRequestsByUserId/{UserId}
// response body is the same as in #13

// 17- Get Translations by MediaId
// https://localinazationapi.azurewebsites.net/Media/GetTranslationsByMediaId/1
export const getTranslationsByMediaId = async (mediaId: number) => {
  const res = await fetch(url + "/Media/GetTranslationsByMediaId/" + mediaId);
  const data = await res.json();
  return data;
};


