import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();    

router.post("/", authMiddleware, TaskController.create);
router.get("/", authMiddleware, TaskController.list);
router.put("/:id", authMiddleware, TaskController.update);
router.delete("/:id", authMiddleware, TaskController.delete);


export default router;
