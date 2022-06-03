import { Request, Response } from "express";
import prisma from "../prisma";
import { verifyPassword } from "../utils";
import { sign, verify } from "jsonwebtoken";

export async function list(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  return res.json(users);
}

export async function store(req: Request, res: Response) {
  const userData = req.body;
  const newUser = await prisma.user.create({ data: userData });
  return res.json(newUser);
}
export async function show(req: Request, res: Response) {
  const { username } = req.params;
  const users = await prisma.user.findUnique({ where: { username } });
  return res.json(users);
}
export async function userTodo(req: Request, res: Response) {
  const { username } = req.params;
  // console.log(`NUOVO AAAA \n \n \n`)

  const user = await prisma.user.findUnique({ where: { username } });

  const todos = !!user
    ? await prisma.todo.findMany({ where: { userId: user?.id } })
    : [];
  console.log(todos);
  return res.json(todos);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Provide email & password" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
        id: true,
      },
    });
    if (user?.password && verifyPassword(password, user.password)) {
      //@ts-ignore
      const token = sign(`${user.id}`, process.env.SECRET);
      return res.status(200).json({ accessToken: token });
    } else {
      return res.status(401).send({ msg: "Wrong credentials" });
    }
  } catch (error) {
    return res.status(404).json({ msg: "User not found" });
  }
}
