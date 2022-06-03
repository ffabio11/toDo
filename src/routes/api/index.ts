import { Router } from "express";
import todoRouter from "./todo";
import userRouter from "./users";
const apiRouter= Router();

apiRouter.get('/', (req,res) => {
    return res.send('routeHomeAPI');
} )
apiRouter.use('/todo',todoRouter)
apiRouter.use('/users',userRouter)

export default apiRouter;