import { Router } from "express";
//מקובל לרווח בין הייבואר של ספריות 
//לבין ייבוא של דפים שלנו
//וגם רוח בין הייבוא לבין הקוד עצמו
import { add, deleteById, getAllBooks, getById, update } from "../controllers/book.js"

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.put("/:id", update);
router.post("/", add);

export default router;