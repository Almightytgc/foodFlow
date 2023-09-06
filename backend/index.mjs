import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodFlowRouter from "./routes/routes.js";

//websocket
import http from "http";
import { Server } from "socket.io";


dotenv.config();

const app = express();
app.use("/producto", express.static("./controllers/admin/menu/producto/"));

const serverSocket = http.createServer(app);

const io = new Server(serverSocket);

io.on("connection", (socket) => {
    // console.log("un usuario se ha conectado waaaa");

    socket.on("solicitudAtencion", (data)=> {
        // console.log("mensaje: ", data);
        io.emit("mensajeAtencionStaff", data);
    })

    socket.on("disconnect", () => {
        // console.log("un usuario se desconectó");
    })
})

export {io};

app.use(cors());
app.use(express.json());
app.use(foodFlowRouter);

const puerto = process.env.APP_PORT;

serverSocket.listen(puerto, () => {
    console.log("servidor corriendo en el puerto ", puerto);
})