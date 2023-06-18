import mongoose, { ConnectOptions } from "mongoose";

const connectDb = async () => {
    try {
      // check if we have a connection to the database or if it's currently
      console.log("connecting to db");
      if (mongoose.connection.readyState >= 1) {
        return;
      }
      return mongoose.connect(process.env.MONGODB_URI ?? '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 
      } as ConnectOptions );
    } catch (error) {
      console.log(error);
    }
  };


export default connectDb