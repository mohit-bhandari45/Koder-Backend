// src/types/express/index.d.ts

import type { IUser } from "../user.types"; // ✅ path relative to this file

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export {};
