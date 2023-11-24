
async function getDepartements() {
    
    const response = await fetch("/depts/regions");
    const body = await response.json();
    return body;

}

async function getDepartementsByRegion(idregion) {
    const response = await fetch("/depts/regions/" + idregion);
    const body = await response.json();
    return body;
}

export { getDepartements, getDepartementsByRegion };