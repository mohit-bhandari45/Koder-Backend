import { Request, Response } from "express";
import User from "../shared/user.model";
import { IUser } from "../../types/user.types";
import { AppError } from "../../utils/appError.utils";
import { makeResponse } from "../../utils/makeResponse.utils";
import bcrypt from "bcrypt";

/**
 * @description Add username (only if user has no username yet)
 * @returns - JSON response with message and data
 * @path /api/user/username
 * @method POST
 */
const addUsernameHandler = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;
    const user = req.user as IUser;

    if (!username) {
        throw new AppError("Username is required", 400);
    }

    // Check if user already has a username
    const current = await User.findById(user._id);
    if (current?.username) {
        throw new AppError("Username already set. Use PATCH to update.", 409);
    }

    // Check if username is taken
    const existing = await User.findOne({ username });
    if (existing) {
        throw new AppError("Username already taken", 409);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, { username }, { new: true });
        res.status(200).json({ message: "Username set successfully", data: updatedUser });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};


/**
 * @description Update username (if user already has one)
 * @returns - JSON response with message and data
 * @path /api/user/username
 * @method PATCH
 */
const updateUsernameHandler = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.body;
    const user = req.user as IUser;

    if (!username) {
        throw new AppError("Username is required", 400);
    }

    // Check if username is taken
    const existing = await User.findOne({ username });
    if (existing && existing._id.toString() !== user._id.toString()) {
        throw new AppError("Username already taken", 409);
    }

    try {
        await User.findByIdAndUpdate(user._id, { username });
        res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};


/**
 * @description Get OWN profile
 * @returns - JSON response with data
 * @path /api/user/me
 * @method GET
 */
const getOwnProfileHandler = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as IUser;
    if (!user || !user._id) {
        throw new AppError("Unauthorized", 401);
    }
    try {
        const found = await User.findById(user._id);
        if (!found) {
            throw new AppError("User not found", 404);
        }

        res.status(200).json(makeResponse("Account Got Successfully", found));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};

/**
 * @description Update OWN profile (excluding username)
 * @returns - JSON response with updated user data
 * @path /api/user/me
 * @method PATCH
 */
const updateOwnProfileHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = req.user as IUser;

    if (!user || !user._id) {
        throw new AppError("Unauthorized", 401);
    }

    const { fullName, profilepicture } = req.body;

    if (!fullName && !profilepicture) {
        throw new AppError("No fields provided to update", 400);
    }

    try {
        const updates: Partial<IUser> = {};

        // Apply only valid updates
        if (fullName) updates.fullName = fullName.trim();
        if (profilepicture) updates.profilepicture = profilepicture.trim();

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new AppError("User not found", 404);
        }

        res.status(200).json(makeResponse("Account Updated Successfully", updatedUser));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};

/**
 * @description Permanently delete the currently logged-in user
 * @route /api/user/me
 *  @method DELETE
 */
const deleteOwnAccountHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = req.user as IUser;

    if (!user || !user._id) {
        throw new AppError("Unauthorized", 401);
    }

    try {
        const deletedUser = await User.findByIdAndDelete(user._id);

        if (!deletedUser) {
            throw new AppError("User not found", 404);
        }

        res.status(200).json(makeResponse("Account permanently deleted"));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};

/**
 * @description Change password for logged-in user
 * @route /api/user/change-password
 *  @method POST
 */

const changePasswordHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = req.user as IUser;

    if (!user || !user._id) {
        throw new AppError("Unauthorized", 401);
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new AppError("Both current and new passwords are required", 400);
    }

    try {
        const existingUser = await User.findById(user._id).select("+password");
        if (!existingUser || !existingUser.password) {
            throw new AppError("User not found", 404);
        }

        const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
        if (!isMatch) {
            throw new AppError("Current password is incorrect", 401);
        }

        // Set new password and save (this triggers the pre-save hash)
        existingUser.password = newPassword;
        await existingUser.save();

        res.status(200).json(makeResponse("Password changed successfully"));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};

/**
 * @description Add password for OAuth users who don't have one
 * @route /api/user/add-password
 *  @method POST
 */

export const addPasswordHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = req.user;

    if (!user || !user._id) {
        throw new AppError("Unauthorized", 401);
    }

    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        throw new AppError("Password must be at least 6 characters long", 400);
    }

    try {
        const existingUser = await User.findById(user._id).select("+password");

        if (!existingUser) {
            throw new AppError("User not found", 404);
        }

        if (existingUser.password) {
            throw new AppError("Password already set. Use /change-password instead.", 409);
        }

        // Add password and save (triggers pre-save hash)
        existingUser.password = newPassword;
        await existingUser.save();

        res.status(200).json(makeResponse("Password added successfully"));
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json(makeResponse(error.message));
            return;
        }

        console.error("Unexpected Error:", error);
        res.status(500).json(makeResponse("Internal Server Error"));
    }
};


export { addUsernameHandler, updateUsernameHandler, getOwnProfileHandler, updateOwnProfileHandler, deleteOwnAccountHandler, changePasswordHandler };