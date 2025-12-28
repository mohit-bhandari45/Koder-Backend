import { ObjectId } from "mongoose";

// Interface for User document
export interface IUser {
    _id: ObjectId;
    fullName: string;
    username: string;
    email: string;
    password: string;
    isVerified: boolean
    profilepicture?: string;
    googleId: string,
    githubId: string
    createdAt: Date;
    updatedAt: Date;
    location: string;
    institute: string;
  }