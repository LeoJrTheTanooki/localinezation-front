import { IBlogItems, IMedia, IToken, ITranslation, ITranslationRequest, IUserData, IUserInfo } from "@/Interfaces/Interfaces"


 const url = "https://localinazationapi.azurewebsites.net"
// const url = "http://localhost:5071"


let userData: IUserData


export const createAccount = async (createdUser: IUserInfo) => {
    //we're using this fetch to make a POST Requst
    //We have to set the method to POST
    //we set the content type to application/ json to specifiy our json data format

    const res = await fetch(url + '/User/AddUser', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(createdUser)
    });
    //we need to check if our post was succesful

    if(!res.ok){
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
    
}

export const login = async (loginUser: IUserInfo) => {
    const res = await fetch( url + "/User/Login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(loginUser)
    });

    if(!res.ok){
        const message = "An Error has occured " + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;

}

// export const getLoggedInUserData = async (username: string) => {
//     const res = await fetch(url + '/User/GetUserByUsername/' + username);
//     const data = await res.json();
//     userData = data;
// }
// export const getLoggedInUserData = async (username: string) => {
//     try {
//       const res = await fetch(`${url}/User/GetUserByUsername/${username}`); // Use template literals to embed variable
//       if (!res.ok) {
//         throw new Error(`Failed to fetch user data: ${res.status}`);
//       }
//       const data = await res.json();
//       userData = data;
//       console.log("(Dataservice.ts:75); Received data:", data);
//       console.log("(Dataservice.ts:75); Received data:", data.publisherName);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
// };

export const getLoggedInUserData = async () => {
    const username = localStorage.getItem("username");
    if (!username){
            console.error("Username is not available in localStorage.");
            return;
    }
    try {
        const res = await fetch(`${url}/User/GetUserByUsername/${username}`); 
        if (!res.ok){
            throw new Error(`Failed to fetch user data: ${res.status}`);
        }
        const data =await res.json();
        userData = data;
        console.log("(dataservice.ts:75); Received data: ", data);
        return data
    } catch (error){
        console.error("Error fetching user data: ", error);
    }
};

export const loggedinData = () => {
    return userData;
}

//This function helps to see if our user is logged in
export const checkToken = () => {
    let result = false;

    let lsData = localStorage.getItem("Token");

    if(lsData !=null){
        result = true
    }
    return result
}

// ---------------------------------05/02/2024----------------------------------------------------------
// the following section is for the Media Translation Items

//Dashboard fetches ashur 05/06/2024 
export const getMediaItemsByUserId = async (userId: number) => {
    const res = await fetch(url + '/Media/GetItemsByUserId/' +  userId);
    const data = await res.json();
    console.log("line 109: " + data)
    return data;
}


// Fetch all media from the backend
export const fetchMedia = async (): Promise<IMedia[]> => {
    const response = await fetch(url + "/Media/GetAllMediaItems");
    if (!response.ok) {
        throw new Error('Failed to fetch media');
    }
    return await response.json(); //Returns a list of media
}

//Post a new translation request for a specific media
export const postTranslationRequest = async (mediaId: number, request: ITranslationRequest): Promise<ITranslationRequest> => {
    const response = await fetch(`${url}/media/${mediaId}/translation-requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request) //convert the request object to json string
    });
    if (!response.ok) {
        throw new Error('Failed to post translation request');
    }
    return await response.json(); //return the newly created translatoon request
};

// submit a new translation for a specific translation request
// SIDE NOTE: DEPRECATED
// export const submitTranslation = async (requestId: number, translation: ITranslation): Promise<ITranslation> => {
//     const response = await fetch(`${url}/translation-requests/${requestId}/translations`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(translation) //convert the translation object to json string
//     });
//     if (!response.ok) {
//         throw new Error('Failed to submit translation');
//     }
//     return await response.json(); //Returns the newly submitted translation
// }

// -------------------------------------5/9/2024---------------------------------------
// Head out of clouds this time (hopefully)

// Submit a media
export const submitMediaItem = async (Media: IMedia) => {
    const response = await fetch (`${url}/Media/AddMediaItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(Media)
    });

    if (!response.ok) {
        throw new Error('Failed to submit media');
    }
    return await response.json(); 
}

// Update account
export const updateAccount = async (updatedUser: IUserInfo) => {
    //we're using this fetch to make a POST Requst
    //We have to set the method to POST
    //we set the content type to application/ json to specifiy our json data format

    console.log('function pass')

    const res = await fetch(url + '/User/UpdateCredentials', {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body:JSON.stringify(updatedUser)
    });
    //we need to check if our post was succesful

    if(!res.ok){
        const message = "An error has occured " + res.status;
        throw new Error(message);
    } else if(res.ok) {
        console.log('res pass')
    } else {
        console.log('???')
    }
}

// Fetch translations
export const fetchTranslations = async (mediaId: number) => {
    const res = await fetch(url + '/Media/GetTranslationRequestsByMediaId/' +  mediaId);
    const data = await res.json();
    return data;
}

export const submitTranslation = async (request: any) => {
    const response = await fetch (`${url}/Media/AddTranslationRequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(request)
    });

    if (!response.ok) {
        throw new Error('Failed to submit translation request');
    }
    return await response.json(); 
}