import { Router } from "express";
import { authMiddleware } from "../middleware/jwt.js";
import { buyTicketsController, getUsersTicketsController, returnTicketController } from "../controllers/ticketController.js";

const router = Router();

router.post('/buy', authMiddleware, buyTicketsController);
router.get('/user', authMiddleware, getUsersTicketsController);
router.patch('/:id/return', authMiddleware, returnTicketController);

export default router;