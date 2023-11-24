
async function getSprefCommune() {
    
    const response = await fetch("/sprefs-com");
    const body = await response.json();
    return body;

}

async function getSprefComByDepartement(iddept) {
    
    const response = await fetch("/sprefs-com/depts/"+iddept);
    const body = await response.json();
    return body;

}

export { getSprefCommune, getSprefComByDepartement };