import { Router } from "express";
import { addUsernameHandler, getOwnProfileHandler, updateUsernameHandler } from "./user.controller";

const router = Router();

router.post("/username", addUsernameHandler);
router.patch("/username", updateUsernameHandler);
router.get("/me", getOwnProfileHandler);

export default router;