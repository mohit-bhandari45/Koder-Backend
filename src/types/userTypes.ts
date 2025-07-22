import { ObjectId } from "mongoose";

// Interface for User document
export interface IUser extends Document {
    _id: ObjectId;
    fullname: string;
    username: string;
    email: string;
    password: string;
    profilepicture?: string;
    createdAt: Date;
    updatedAt: Date;
  }