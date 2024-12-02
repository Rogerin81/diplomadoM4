import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/authenticate.middleware.js";

const router = Router();

router.route('/').get(userController.getUsers).post(userController.createUsers);
router
    .route('/:id').get(authenticateToken, userController.getUser)
    .put(authenticateToken, userController.updateUser)
    .patch(authenticateToken, userController.activateInactivate)
    .delete(authenticateToken, userController.deleteUser);

router.route('/:id/tasks').get(authenticateToken, userController.getTask);
export default router;