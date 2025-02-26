const profile = require('../models/profileSchema')

async function getProfile(data) {
    if(data){
        try {
            console.log("data:",data);
            
        } catch (error) {
            console.error('error found in getdata',error);
            
        }
    }
}
module.exports = {getProfile}