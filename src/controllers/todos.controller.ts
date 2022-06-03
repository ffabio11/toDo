import prisma from "../prisma";
import { Request, Response } from "express";

export async function store(req: Request, res: Response) {
  const data = req.body;
  const newEntity = await prisma.todo.create({ data });
  return res.json(newEntity);
}

export async function list(req: Request, res: Response) {
  const todos = await prisma.todo.findMany();
  return res.json(todos);
}
export async function show(req: Request, res: Response) {
  const { id } = req.params;
  const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });
  return res.json(todo);
}
export async function update(req: Request, res: Response) {
  const updatedTodo = req.body;
  const params = req.params;
  const id = Number(params["id"]);
  try {
    const todoUpdated = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        description: updatedTodo.description,
        title: updatedTodo.title,
        completed: updatedTodo.completed,
      },
    });
    return res.status(200).send(todoUpdated);
  } catch (error) {
    return res.status(400).send({ msg: "Cannot update todo" });
  }
}
