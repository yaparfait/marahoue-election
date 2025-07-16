async function getAllScrutins() {
    
    const response = await fetch("/scrutins");
    const body = await response.json();
    return body;

}

async function getScrutinById(idscrutin) {
    const response = await fetch("/scrutins/" + idscrutin);
    const body = await response.json();
    return body;
}

async function getCandidatsByScrutin(idscrutin) {
    const response = await fetch("/scrutins/" + idscrutin + "/candidats");
    const body = await response.json();
    return body;
}

async function getScrutinsWithCands() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(scrutin)
    };
    const response = await fetch("/scrutins/candidats", requestOptions);
    const body = await response.json();
    return body;
}

async function createScrutin(scrutin) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scrutin)
    };
    const response = await fetch("/scrutins", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function updateScrutin(scrutin) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scrutin)
    };
    const response = await fetch("/scrutins", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function deleteScrutin(idscrutin) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch("/scrutins/"+idscrutin, requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

export { getAllScrutins, getScrutinById, getCandidatsByScrutin, getScrutinsWithCands, createScrutin, updateScrutin, deleteScrutin };