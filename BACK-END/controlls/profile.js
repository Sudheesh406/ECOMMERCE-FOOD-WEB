
const {getProfile} = require('../services/profileService.js')

async function profileUpload(req,res) {
    if(req.body){
    try {
        let data = await getProfile(req.body)
        if(data){
            return res.status(200).json({message:"successfully get data",data})
        }else{
            return res.status(400).json({message:"error in get data"})
        }
    } catch (error) {
        console.error("error found in profileUpload");
        return res.status(400).json({message:"error in profileUpload"})
    }
}
}

module.exports = {profileUpload}