import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://ankitduke732:hDn4kRJcDemGalPH@cluster0.leupytn.mongodb.net/ecartdb?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`Connected to DB ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.messsage}`);
    process.exit(1);
  }
};

export default connectToDb;
