import mongoose from "mongoose";

const conn = {
    isConnected: false
};

export async function connectDB() {
    if (conn.isConnected) return;

    const db = await mongoose.connect('mongodb://127.0.0.1:27017/nextmongocrud');
    const dbName = mongoose.connection.name;
    console.log(`Conectado a la base de datos: ${dbName}`);
    conn.isConnected = db.connections[0].readyState;
}

mongoose.connection.on("connected", () => {
    console.log("Mongoose está conectado");
});

mongoose.connection.on("error", (err) => {
    console.error("Error al conectar con Mongoose:", err);
});

