import { Request, Response } from "express";
import { responseObject } from "../utils/responseObject";
import userService from "../services/user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  register: async (req: Request, res: Response) => {
    const { name, address, role, email, password } = req.body;
    if (!name || !address || !role || !email || !password) {
      return res
        .status(400)
        .send(responseObject(null, "Missing required fields"));
    }
    const user = await userService.getUserByEmail(email);
    if (user) {
      return res.status(400).send(responseObject(null, "Email already exists"));
    }
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const createdUser = await userService.createUser({
        name,
        address,
        role,
        email,
        password: encryptedPassword,
      });
      return res.status(201).send(responseObject(createdUser, null));
    } catch (error) {
      return res
        .status(500)
        .send(responseObject(null, "Internal server error"));
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send(responseObject(null, "Missing required fields"));
    }
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send(responseObject(null, "No user with such email"));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send(responseObject(null, "Invalid password"));
    }
    try {
      const token = jwt.sign(
        { email: user.email, role: user.role, userId: user._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).send(responseObject({ token }, null));
    } catch (error) {
      return res
        .status(500)
        .send(responseObject(null, "Internal server error"));
    }
  },
};
