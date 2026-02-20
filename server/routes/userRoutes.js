import express from 'express';
import {
    loginUser,
    registerUser,
    logoutUser,
} from '../controllers/authController.js';
import {
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/adminController.js';
import {
    getUserProfile,
    updateUserProfile,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/register', registerUser);
router.get('/', protect, admin, getUsers);

router.post('/logout', logoutUser);
router.post('/login', loginUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
