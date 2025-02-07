const {upload,create,removeData} = require('../services/wishService')

async function uploadWish(req,res) {
    let id = req.User.id
    if(id){

        try {
            let result = await upload(id)
            if(result){
                res.status(200).json({message:"success",result})
            }else{
                res.status(401).json({message:"their is no data found"})
            }
        } catch (error) {
            console.error("error found in uploadWish",error);
            res.status(400).json({message:"error in upload data"})
        }
    }else{
        res.status(401).json({message:"their is no data found"})
    }
    
}


async function addWish(req,res) {
    let data = req.body
    let id = req.User.id
    if(id,data){
        try {
            let result = await create(data.id,id)
            if(result){
                res.status(200).json({message:"success",result})
            }else{
                res.status(401).json({message:"data not added"})
            }
        } catch (error) {
            console.error("error found in removewish",error);
            res.status(400).json({message:"error found in removeWish"})

        }
    }else{
        res.status(401).json({message:"id not found so data not added"})
    }
}


async function removeWish(req,res) {
    let id = req.User.id
    if(id){
        try {
            let result = await removeData(id)
            if(result){
                res.status(200).json({message:"success",result})
            }else{
                res.status(401).json({message:"data not deleted"})
            }
        } catch (error) {
            console.error("error found in removewish",error);
            res.status(400).json({message:"error found in removeWish"})

        }
    }else{
        res.status(401).json({message:"data not deleted"})
    }
}

module.exports = {uploadWish,addWish,removeWish}