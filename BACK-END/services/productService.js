const Product = require('../models/productSchema')

async function upload() {
    
        try {
          let result = await Product.find()
            return result;
            
        } catch (error) {
            console.error("error found in data uploading");
            return null;
            
        }
        
}


async function Offers() {
    
        try {
          let result = await Product.find({offer:true})
            return result;
            
        } catch (error) {
            console.error("error found in data uploading");
            return null;
            
        }
        
}

async function create(data) {
 
    if(data){
        try {
          let result = await Product.create(data)
         
         
            if(result){
                return result;
            }else{
                console.log("result is null");
                
            }
        } catch (error) {
            console.error("error found in data uploading");
            return null;
        }
        
    }else{
        console.log("data is empty");

    }
}

async function retrieveData(data) {
    let {id} = data
    if(id){
        try {
        
            let data  = await Product.findById(id)     
            if(data){
               
                return data
                
            }else{
               
                return null
                
            }
        } catch (error) {
            console.error("error found in retrieveData...");
            
        }
    }
}

async function update(data) {
    try {
        if(data){
            
            
            let result = await Product.findOneAndUpdate(
                { _id: data._id }, 
                { $set: data },  
                { new: true}  
            );
            if(result){
               
                return result

            }else{
                console.error("error found in update data");
                return null
            }
            
        }
    } catch (error) {
        console.error("error found in update...");
        
    }
    
}

async function removeData(data) {
    if(data){
        try {
            let result = await Product.findByIdAndDelete(data.id);
            if(result){
                return result
            }else{
                return null
            }
        } catch (error) {
            console.error("error found in remove data...",error);
            
        }
    }else{
        console.log("id not found...");
        
    }
}

module.exports = {upload,create,retrieveData,update,removeData,Offers}