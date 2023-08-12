
export async function getAllCats(req, res){
    return res.send('getallcats')
}

export async function getCatById(req, res){
    return res.send('getcatbyid')
}

export async function createCat(req, res){
    return res.send('createcat')
}

export async function updateCat(req, res){
    return res.send('updateCat')
}