
async function getLieuVote(){
    const response = await fetch("/lieuvote");
    const body = await response.json();
    return body;
}

async function getLieuVoteById(idlieuvote){
    const response = await fetch("/lieuvote/"+idlieuvote);
    const body = await response.json();
    return body;
}

async function getLieuVoteByLocalites(idlocalite){
    const response = await fetch("/lieuvote/spref-com/"+idlocalite);
    const body = await response.json();
    return body;
}
// Les Lieus de vote de la commune de Bouaflé
async function getLieuVoteCommuneBouafle(){
    const response = await fetch("/lieuvote/spref-com/commune/bouafle");
    const body = await response.json();
    return body;
}

async function createLieuVote(lieuvote){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lieuvote)
    };
    const response = await fetch("/lieuvote", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function updateLieuVote(lieuvote){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lieuvote)
    };
    const response = await fetch("/lieuvote", requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function deleteLieuVote(idlieuvote){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch("/lieuvote/"+idlieuvote, requestOptions);
    const body = await response.json();
    const status = JSON.stringify(body).includes('succès') ? response.status : 400;
    return {"message": body, "status" : status};
}

async function getBureauVoteByLieu(idlieuvote){
    const response = await fetch("/lieuvote/bureau-vote/lieuvote/"+idlieuvote);
    const body = await response.json();
    return body;
}
/*
router.post("/bureau-vote", (req, res) => {
    lieuvote.createBureauVote(req.body.libbv, req.body.idlieuvote).then(data => res.json(data));
});

router.put("/bureau-vote", (req, res) => {
    lieuvote.updateBureauVote(req.body.idbv, req.body.libbv, req.body.nbreinscrit).then(data => res.json(data));
});

router.delete("/bureau-vote/:id", (req, res) => {
    lieuvote.deleteBureauVote(req.params.id).then(data => res.json(data));
});
*/
export { getLieuVote, getLieuVoteById, getLieuVoteByLocalites, getLieuVoteCommuneBouafle, createLieuVote, updateLieuVote, deleteLieuVote, getBureauVoteByLieu };