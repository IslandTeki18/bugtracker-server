import express from "express";
const router = express.Router();
import {
  getAuthUser,
  postNewUser,
  putUpdateUser,
  getUserInfo,
} from "../services/user.service.js";
import { admin, protect } from "../middleware/auth.middleware.js";

router.route("/").post(getAuthUser);
router.route("/register").post(postNewUser);
router.route("/settings").put(protect, putUpdateUser).get(protect, getUserInfo);

export default router;
