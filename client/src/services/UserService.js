
async function getAllUsers() {
    
    const response = await fetch("/users");
    const body = await response.json();
    return body;

}

async function getUserByUsername(username) {
    
    const response = await fetch("/users/infos/" + username);
    //const body = await response.json();
    return response;

}

async function registerUser(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    const response = await fetch("/users/register", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? 200 : response.status;
    return {"message": body, "status" : status};
}

async function loginUser(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    const response = fetch("/users/login", requestOptions);
    return response;
}

export {getAllUsers, getUserByUsername, registerUser, loginUser};