import mongoose, { Schema } from "mongoose";
import { IUser } from "../../types/userTypes";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            maxlength: [100, "Full name cannot exceed 100 characters"],
        },
        username: {
            type: String,
            required: false,
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
            sparse: true,
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
        googleId: {
            type: String,
            default: null,
            trim: true,
        },
        githubId: {
            type: String,
            default: null,
            trim: true,
        },
        isVerified:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err as any);
    }
});

// Create and export the User model
const User = mongoose.model<IUser>("user", userSchema);
export default User;
