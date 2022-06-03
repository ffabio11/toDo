import { Router } from "express";
import * as UserController from "../../controllers/users.controller";
const userRouter = Router();
import { sign, verify } from "jsonwebtoken";

userRouter.get(
  "/private",
  (req, res, next) => {
    // auth mi restituisce Bearer <token>
    const auth = req.headers["authorization"];
    //@ts-ignore
    const token = /Bearer (.+)/.exec(auth)[1];
    console.log(token);
    //@ts-ignore
    const isAuthorized = verify(token, process.env.SECRET);
    if (isAuthorized) {
      next();
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  },
  (req, res) => res.json({ msg: "Hello, it's me" })
);

userRouter.get("/", UserController.list);

userRouter.post("/", UserController.store);

userRouter.get("/:username", UserController.show);

userRouter.get("/:username/todos", UserController.userTodo);

userRouter.post("/login", UserController.login);

export default userRouter;
