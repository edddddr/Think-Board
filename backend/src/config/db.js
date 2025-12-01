import mongoose from "mongoose"

export const connectDB = async  () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("The Mongo Database is Connected successfully!");
    }catch(error){
        console.error("Error connecting wiht Mongo Database", error);
        process.exit(1)
    }
}