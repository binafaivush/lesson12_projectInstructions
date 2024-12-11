import { Router } from "express";
//מקובל לרווח בין הייבואר של ספריות 
//לבין ייבוא של דפים שלנו
//וגם רוח בין הייבוא לבין הקוד עצמו
import {getAllusers,getById,login,signUp,update} from "../controllers/user.js"

const router = Router();

router.get("/", getAllusers);
router.get("/:id", getById);

router.put("/:id", update);
router.post("/", signUp);
router.post("/login", login);
//למרות שבשביל לשלוף משתמשים בגט בגלל שרצינו שהנתונים הרגישים יישלחו בגוף הבקשה נשתמש בפוסט


export default router;