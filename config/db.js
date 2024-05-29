import mongoose from "mongoose";


let connected = false ; 

const connectDB = async () => {

    mongoose.set('strictQuery' , true); 

    if(connected){
        console.log('MongoDB is Already Connected ... ');
        return ; 
    }

       try {
          let connect = await mongoose.connect(process.env.CONNECTION_STRING);
            console.log('MongoDB is connected on host',connect.connection.host);
       } catch (error) {
            console.log(error);
       }

};

export default connectDB ; 