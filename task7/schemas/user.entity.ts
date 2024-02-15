import { Schema, model, Types } from "mongoose";

export interface UserEntity {
  _id: Types.ObjectId;
  name: string;
  address: string;
}

export interface WriteUserEntity {
  name: string;
  address: string;
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
  },
  { versionKey: false }
);

export const User = model("User", UserSchema);
