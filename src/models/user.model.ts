import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/userTypes";

// User Schema
const userSchema = new Schema<IUser>(
    {
        fullname: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            maxlength: [100, "Full name cannot exceed 100 characters"],
        },
        username: {
            type: String,
            required: [false, "Username is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [30, "Username cannot exceed 30 characters"],
            match: [
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores",
            ],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        profilepicture: {
            type: String,
            default: null,
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create and export the User model
const User = mongoose.model<IUser>("user", userSchema);
export default User;
