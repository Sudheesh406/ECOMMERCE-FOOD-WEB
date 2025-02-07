const User = require('../models/userSchema');

async function findUser(email) {
    if (email) {
        try {
            let isExist = await User.findOne({ email: email });
          
            
            
            if (isExist) {
               
                
                
                return isExist;
            } else {
               
                
                return null; 
            }
        } catch (error) {
            console.error("Error found in finding User:", error);
            
        }
    } else {
        console.log("No data provided"); 
        return null;
    }
}


async function createNewAccount(data) {
    let {email,username,password} = data
    if(data){
       let value = await findUser(email)
       if(!value){
           try {
        let result = await User.create({email,username,password})
        if(result){
      
            
           
           return result
        }
       } catch (error) {
               console.error("error found in user creation");
       }
       }else{
        return value;
       }
    }
}

async function findWithId(id) {
    if(id){

        try {
            let result = await User.findOne({ _id:id })
            if(result){
                return result
            }else{
                return null
            }
        } catch (error) {
            console.error("error found in findWithId:",error);
            
        }
    }else{
        console.log("id is not getting...");
        
    }

}


async function findAllUser() {
    
        try {
            let result = await User.find()
            if(result){
              
                
                return result
            }else{
                return null
            }
        } catch (error) {
            console.error("error found in findAllUser:",error);
            
        }

}




module.exports = {findUser,createNewAccount,findWithId,findAllUser}