import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Base de datos conectada correctamente")
    }
    catch (error) {
        console.error("No se pudo conectar a la base de datos", error)
        process.exit(1);
    }
}