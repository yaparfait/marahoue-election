
async function getAllUsers() {
    
    const response = await fetch("/users");
    const body = await response.json();
    return body;

}

async function getUserByUsername(username) {
    
    const response = await fetch("/users/" + username);
    const body = await response.json();
    return body;

}

async function registerUser(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vote)
    };
    const response = await fetch("/users/register", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function loginUser(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vote)
    };
    const response = await fetch("/users/login", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}