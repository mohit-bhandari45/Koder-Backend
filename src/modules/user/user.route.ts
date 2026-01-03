import { Router } from "express";
import {
  addPasswordHandler,
  addUsernameHandler,
  changePasswordHandler,
  deleteOwnAccountHandler,
  getOwnProfileHandler,
  updateOwnProfileHandler,
  updateUsernameHandler,
} from "./user.controller";

const router = Router();

/* Username */
router.post("/username", addUsernameHandler);
router.patch("/username", updateUsernameHandler);
/* Username */

/* Profile */
router.get("/me", getOwnProfileHandler);
router.patch("/me", updateOwnProfileHandler);
router.delete("/me", deleteOwnAccountHandler);

/* security */
router.post("/add-password", addPasswordHandler);
router.post("/change-password", changePasswordHandler);

export default router;
