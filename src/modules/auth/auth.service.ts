import bcrypt from "bcrypt";
import User from "../shared/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { IUser } from "../../types/userTypes";
import { OtpService } from "./otp.service";
import { AppError } from "../../utils/AppError";

interface IAuthResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export class UserService {
    static async register(fullName: string, email: string, password: string): Promise<IAuthResponse> {
        // 🔍 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError("User already exists!", 400);
        }

        // ✅ Create user
        const user = await User.create({
            fullName,
            email,
            password,
        });

        // 📩 Send email verification OTP
        await OtpService.generateAndSendOTP(email, "verify");

        // 🎟️ Generate tokens
        const accessToken = generateAccessToken(user as any);
        const refreshToken = generateRefreshToken(user as any);

        return { user, accessToken, refreshToken };
    }

    static async login(email: string, password: string): Promise<IAuthResponse> {
        // 1. Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError("Invalid Credentials", 400);
        }

        // 2. Check if password exists (social login users may not have one)
        if (!user.password) {
            throw new AppError("Account has no password. Use social login or set a password.", 400);
        }

        // 3. Compare provided password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AppError("Invalid Credentials", 400);
        }

        // 4. Generate tokens
        const accessToken = generateAccessToken(user as any);
        const refreshToken = generateRefreshToken(user as any);

        // 5. Return response
        return { user, accessToken, refreshToken };
    }
}
