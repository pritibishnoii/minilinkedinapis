import express from 'express';
import { createPost, getPost } from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/createpost', authMiddleware, createPost);
router.get('/getpost', getPost);

export default router;
