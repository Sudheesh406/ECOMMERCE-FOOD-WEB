const {upload,create,retrieveData,update,removeData,Offers,findTrashProducts,RestoreProducttrash, updatetrashload} = require('../services/productService')

async function uploadProducts(req,res) {
    try {
        let result = await upload()
        if(result){
            res.status(200).json({message:"success",result})
        }else{
            res.status(401).json({message:"their is no data found"})
        }
    } catch (err) {
        console.log("error found in uploadProducts");
        res.status(400).json({message:"error found in uploadProducts"})
    }
}


async function uploadOffers(req,res) {
    try {
        let result = await Offers()
        if(result){
            res.status(200).json({message:"success",result})
        }else{
            res.status(401).json({message:"their is no data found"})
        }
    } catch (err) {
        console.log("error found in uploadProducts");
        res.status(400).json({message:"error found in uploadProducts"})
    }
}

async function createProduct(req,res) {
    let data = req.body
    data.image = req.file.location
    try {
        let result = await create(data)
      
        if(result){
        
            res.status(200).json({message:"success",result})
        }else{
            res.status(401).json({message:"error in create a data"})
        }
    } catch (err) {
        console.log("error found in createProducts");
        res.status(400).json({message:"error found in createProducts"})

    }
}

async function retrieveProduct(req,res) {
    let id = req.body
    try {
        let result = await retrieveData(id)
        if(result){
            res.status(200).json({message:"success",result})
        }else{
            res.status(401).json({message:"error in retrieve a data"})
        }
    } catch (err) {
        console.log("error found in createProducts");
        res.status(400).json({message:"error found in retrieveProducts"})

    }
}

async function updateProduct(req,res) {
    let data = req.body
    let id  = req.params.id

    data.image = req.file?.location

    try {
        let result = await update(data ,id)
        if(result){
            res.status(200).json({message:"success",result})
        }else{
            res.status(401).json({message:"error in update a data"})
        }
    } catch (err) {
        console.log("error found in update products");
        res.status(400).json({message:"error found in update products"})

    }
}

async function removeProduct(req,res) {
    let data = req.body
    try {
        let result = await removeData(data)
        if(result){
            res.status(200).json({message:"success",result})
        }else{
            res.status(401).json({message:"error in remove a data"})
        }
    } catch (err) {
        console.log("error found in remove products",err);
        res.status(400).json({message:"error found in remove products"})

    }
}

async function trashData(req,res) {
    
        try {
            let result = await findTrashProducts()
            if(result){
                res.status(200).json({message :"success",result})
            }
        } catch (error) {
            console.error("error found in trashData",error);
            res.status(400).json({message :"errror found in trashData"})

    }
}

const dataRestore = async (req,res)=>{
    if(req.body){
        try {
            let result = await RestoreProducttrash(req.body)
            if (result) {
                res.status(200).json({message:"sucess",result})
            }
        } catch (error) {
            console.error("error found in dataRestore",error);

        }
    }
}


const trashload = async(req,res)=>{
    if(req.body){
        try {
            let result = await updatetrashload(req.body)
            if(result){
                res.status(200).json({message:"sucess",result})
            }else{
                res.status(400).json({message:"erorr in trashload"})
            }
        } catch (error) {
            console.error("error found in trashload",error);
            res.status(400).json({message:"erorr in trashload",error})
        }
    }
}


module.exports = {uploadProducts,createProduct,retrieveProduct,updateProduct,removeProduct,uploadOffers,trashData,dataRestore,trashload}