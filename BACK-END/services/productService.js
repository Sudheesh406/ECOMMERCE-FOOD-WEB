const Product = require('../models/productSchema')

async function upload() {
    
        try {
          let data = await Product.find()
        let result = data.filter((element) => element.status == true)
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

async function update(data,id) {
    try {
        if(data){      
            let result = await Product.findOneAndUpdate(
                { _id: id }, 
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

const findTrashProducts = async ()=>{
    try {
        let result = await Product.find({status:false})
        if(result){
            return result
        }
    } catch (error) {
        console.error('error found in findTrashProducts',error);
        
    }
}

const RestoreProducttrash = async (id) => {
    try {
        let result = await Product.findByIdAndUpdate(
            id.id, 
            { status: true }, 
            { new: true } 
        );
        if (result) {
            return result;
        } else {
            console.log('Product not found');
            return null;
        }
    } catch (error) {
        console.error('Error found in RestoreProducttrash:', error);
    }
};

const updatetrashload = async(id)=>{
    try {
        let result = await Product.findByIdAndUpdate(
            id.id, 
            { status: false }, 
            { new: true } 
        );
        if (result) {
            return result;
        } else {
            console.log('Product not found');
            return null;
        }
    } catch (error) {
        console.error('Error found in RestoreProducttrash:', error);
    }
}


module.exports = {upload,create,retrieveData,update,removeData,Offers,findTrashProducts,RestoreProducttrash, updatetrashload}