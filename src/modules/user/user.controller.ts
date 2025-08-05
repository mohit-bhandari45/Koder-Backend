import { Request, Response } from "express";
import User from "../shared/user.model";
import { IUser } from "../../types/userTypes";


/**
 * @description Add username (only if user has no username yet)
 * @returns - JSON response with message and data
 * @path /api/user/username
 * @method POST
 */
const addUsernameHandler = async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = req.user as IUser;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    // Check if user already has a username
    const current = await User.findById(user._id);
    if (current?.username) {
        return res.status(400).json({ message: "Username already set. Use PATCH to update." });
    }

    
    // Check if username is taken
    const existing = await User.findOne({ username });
    if (existing) {
        return res.status(409).json({ message: "Username already taken" });
    }
    
    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, { username }, { new: true });
        res.status(200).json({ message: "Username set successfully", data: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


/**
 * @description Update username (if user already has one)
 * @returns - JSON response with message and data
 * @path /api/user/username
 * @method PATCH
 */
const updateUsernameHandler = async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = req.user as IUser;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    // Check if username is taken
    const existing = await User.findOne({ username });
    if (existing && existing._id.toString() !== user._id.toString()) {
        return res.status(409).json({ message: "Username already taken" });
    }

    try {
        await User.findByIdAndUpdate(user._id, { username });
        res.status(200).json({ message: "Username updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


/**
 * @description Get OWN profile
 * @returns - JSON response with data
 * @path /api/user/me
 * @method GET
 */
const getOwnProfileHandler = async (req: Request, res: Response) => {
    const user = req.user as IUser;
    if (!user || !user._id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const found = await User.findById(user._id);
        if (!found) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: found });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export { addUsernameHandler, updateUsernameHandler, getOwnProfileHandler };