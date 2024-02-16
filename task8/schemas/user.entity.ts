import { Schema, model, Types } from "mongoose";

export interface UserEntity {
  _id: Types.ObjectId;
  name: string;
  address: string;
  email: string;
  role: string;
  password: string;
}

export interface WriteUserEntity {
  name: string;
  address: string;
  email: string;
  role: string;
  password: string;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export const User = model("User", UserSchema);
