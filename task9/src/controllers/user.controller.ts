import { Request, Response } from "express";
import { responseObject } from "../utils/index.js";
import { userService } from "../services/index.js";

export default {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    return res.status(200).send(responseObject(users, null));
  },

  getUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await userService.getUser(id);
    return res.status(200).send(responseObject(user, null));
  },

  createUser: async (req: Request, res: Response) => {
    const user = req.body;
    const createdUser = await userService.createUser(user);
    return res.status(201).send(responseObject(createdUser, null));
  },
};
