const Wish = require('../models/wishSchema')

async function upload(id) {
    
    try {
      let result = await Wish.find({userId:id})
        console.log("data updated successfully");
        return result;
        
    } catch (error) {
        console.error("error found in data uploading");
        return null;
        
    }
    
}

async function create(dataId,id) {
    if(data,id){
        userId = id
        productId = dataId
        try {
          let result = await Wish.create({userId,productId})
            console.log("data updated successfully");
            return result;
            
        } catch (error) {
            console.error("error found in data uploading");
            return null;
            
        }
        
    }else{
        console.log("data is empty");

    }
}


async function removeData(id) {
    if(id){
        try {
            let result = await Wish.deleteMany({ userId:id })
            if(result){
                return result
            }else{
                return null
            }
        } catch (error) {
            console.error("error found in remove data...");
            
        }
    }else{
        console.log("id not found...");
        
    }
}

module.exports = {upload,create,removeData}