import { Router } from "express";
import {
  addBorrow,
  getAllBorrow,
  getAllBorrowsByUserId,
  getBorrowById,
  returnBorrow,
} from "../controllers/borrow.js";

const router = Router();
router.get("/", getAllBorrow);
router.get("/:id", getBorrowById);
router.get("/byUserId/:userid", getAllBorrowsByUserId);
router.put("/:id", returnBorrow);
router.post("/", addBorrow);

export default router;
