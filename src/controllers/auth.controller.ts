import { Request, Response } from "express";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt";

async function refreshTokenHandler(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        const payload = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken(payload);
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.status(200).json({ message: "Access token refreshed" });
    } catch (err) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
}

export { refreshTokenHandler };