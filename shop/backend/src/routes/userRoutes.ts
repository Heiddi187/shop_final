import { Router } from "express";
import { deleteUserController, getAllUsersController, loginController, signupController, updateUserController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/jwt.js";

const router = Router();

router.get('/', getAllUsersController);
router.post('/signup', signupController);
router.post('/login', loginController);
router.patch('/user', authMiddleware, updateUserController);
router.delete('/user', authMiddleware, deleteUserController);

export default router;