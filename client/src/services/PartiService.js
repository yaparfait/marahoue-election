async function getAllPartiPolitics() {
    
    const response = await fetch("/partis");
    const body = await response.json();
    return body;

}

async function getPartiPoliticByID(idparti) {
    const response = await fetch("/partis/" + idparti);
    const body = await response.json();
    return body;
}

async function createPartiPolitic(parti){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parti)
    };
    const response = await fetch("/partis", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

export { getAllPartiPolitics, getPartiPoliticByID, createPartiPolitic };