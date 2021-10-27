import "dotenv/config"
import express from "express";
import { Request, Response } from "express";
import http from "http"
import { Server } from "socket.io";
import cors from "cors";

import { router } from "./routes";
 
const app = express();
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket)=>{
    console.log(`Usuario Conectado, socket ${socket.id}`);
    
})


app.use(express.json())

app.use(router)

app.use(express.static(__dirname +"/../public"))

app.get('/', function (req:Request, res: Response) {
    res.render("index.html")
})

app.get("/github", (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback", (req, res) => {
    const { code } = req.query

    return res.json( code)
})

export { server, io}