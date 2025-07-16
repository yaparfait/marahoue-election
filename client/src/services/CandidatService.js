async function getCandidats() {
    const response = await fetch("/candidats");
    const body = await response.json();
    return body;
}

async function getCandidatById(idcand) {
    const response = await fetch("/candidats/" + idcand);
    const body = await response.json();
    return body;
}

async function createCandidat(candidat){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidat)
    };
    const response = await fetch("/candidats", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function updateCandidat(candidat){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidat)
    };
    const response = await fetch("/candidats", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function deleteCandidat(idcand){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch("/candidats/"+idcand, requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function getAllCivilites() {   
    const response = await fetch("/candidats/civilites/all");
    const body = await response.json();
    return body;
}

export { getCandidats, getCandidatById, createCandidat, updateCandidat, deleteCandidat, getAllCivilites };