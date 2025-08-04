import bcrypt from "bcrypt";
import User from "./user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { IUser } from "../../types/userTypes";
import { OtpService } from "./otp.service";

interface IRegisterResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export class UserService {
    static async register(fullName: string, email: string, password: string): Promise<IRegisterResponse> {
        // 🔍 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists!");
        }

        // ✅ Create user
        const user = await User.create({
            fullName,
            email,
            password,
        });

        await OtpService.generateAndSendOTP(email, "verify");

        const accessToken = generateAccessToken(user as any);
        const refreshToken = generateRefreshToken(user as any);

        return { user, accessToken, refreshToken };
    }

    static async login(email: string, password: string): Promise<IRegisterResponse> {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (!user.password) {
            throw new Error("Account has no password. Use social login or set a password.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const accessToken = generateAccessToken(user as any);
        const refreshToken = generateRefreshToken(user as any);

        return { user, accessToken, refreshToken };
    }
}
