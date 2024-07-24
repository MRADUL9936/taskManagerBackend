import {connect} from 'mongoose';

export default async function conectToMongoDb(res){
    try{
        console.log(process.env.MONGODB_URI)
        await connect(process.env.MONGODB_URI)
        console.log("MongoDb Connected")

    }catch(error){     
           throw error
    }

}