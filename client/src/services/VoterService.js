
async function createVote(vote){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vote)
    };
    const response = await fetch("/voter", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function updateVote(vote){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vote)
    };
    const response = await fetch("/voter", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}
/*
async function getVoteByBureau(idlieuvote){
    const response = await fetch("/voter/"+idlieuvote);
    const body = await response.json();
    return body;
}
*/
async function getVoteByBureau(idbv, idsrutin){
    const response = await fetch("/voter/"+idbv+"/"+idsrutin);
    const body = await response.json();
    return body;
}

async function getVoteByBureauMairie(idbv){
    const response = await fetch("/voter/mairie/bouafle/"+idbv);
    const body = await response.json();
    return body;
}

async function getVoteByBureauRegion(idbv){
    const response = await fetch("/voter/region/marahoue/bureaux/"+idbv);
    const body = await response.json();
    return body;
}

async function getResultatMunicipales() {   
    const response = await fetch("/voter/mairie/bouafle/resultat/final");
    const body = await response.json();
    return body;
}

async function getResultatMunicipalesByCentre(idlieuvote) {   
    const response = await fetch("/voter/mairie/bouafle/resultat/lieuvote/"+idlieuvote);
    const body = await response.json();
    return body;
}

export { createVote, updateVote, getVoteByBureau, getVoteByBureauMairie, getVoteByBureauRegion, getResultatMunicipales, getResultatMunicipalesByCentre };
