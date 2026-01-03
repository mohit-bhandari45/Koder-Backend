import type { IUser } from "../types/user.types";
import jwt from "jsonwebtoken";

const accessSecret = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const refreshSecret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export function generateAccessToken(user: IUser): string {
  return jwt.sign({ _id: user._id, email: user.email }, accessSecret, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(user: IUser): string {
  return jwt.sign({ _id: user._id, email: user.email }, refreshSecret, {
    expiresIn: "7d",
  });
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, refreshSecret);
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, accessSecret);
}
