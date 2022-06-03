import server from "./server";


server.listen(process.env.PORT,()=>{
    console.log("My server is up", process.env.PORT)
})