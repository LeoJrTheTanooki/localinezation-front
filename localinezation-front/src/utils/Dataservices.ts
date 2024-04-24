import { IBlogItems, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"


 const url = "https://localinazationapi.azurewebsites.net"
//const url = "http://localhost:5071"


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
export const getLoggedInUserData = async (username: string) => {
    try {
        const res = await fetch(url + '/User/GetUserByUsername/' + username);
        if (!res.ok) {
            throw new Error(`Failed to fetch user data: ${res.status}`);
        }
        const data = await res.json();
        userData = data;

        // Log the response data to the console
        console.log("(Dataservice.ts:75); Received data:", data);
        //json example response:
        //{
        // "userId": 1,
        //  "publisherName": "Test1"
        //}
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

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