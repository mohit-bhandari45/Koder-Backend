import { IUser } from "../../types/userTypes";

declare global {
  namespace Express {
    interface Request {
      user?: User | undefined;
    }
  }
}
