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
        serverSelectionTimeoutMS: 30000 ,
        dbName: process.env.MONGODB_DB,
      } as ConnectOptions );
    } catch (error) {
      console.log(error, 'error connecting mongodb database');
    }
  };


export default connectDb