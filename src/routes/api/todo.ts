import { Router } from "express";
import * as TodoController from '../../controllers/todos.controller';

const todoRouter = Router();

todoRouter.post("/",TodoController.store)
todoRouter.get("/", TodoController.list)
todoRouter.get("/:id", TodoController.show)
todoRouter.put("/:id",TodoController.update)



export default todoRouter