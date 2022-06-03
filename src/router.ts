import { Router } from "express";

import apiRouter from "./routes/api";
import webRouter from "./routes/web";

const router = Router()

router.use('/api',apiRouter)
router.use('/web',webRouter)

router.get('/', (req,res) => {
    return res.json({'yo': 'routeHome'});

} )


 

export default router