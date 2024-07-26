import {connect} from 'mongoose';

export default async function conectToMongoDb(res){
    try{
        await connect(process.env.MONGODB_URI)
        console.log("MongoDb Connected")

    }catch(error){     
           throw error
    }

}