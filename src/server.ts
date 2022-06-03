import express from "express";
import 'dotenv/config'
import router from "./router";

const server= express();

server.use(express.json())

server.use('/', express.static(__dirname+'/public'))

server.use('/', router)

export default server;