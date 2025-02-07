async function upload() {
    
    try {
      let result = await Product.find()
        console.log("data updated successfully");
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
            console.error("error found in remove data...");
            
        }
    }else{
        console.log("id not found...");
        
    }
}
