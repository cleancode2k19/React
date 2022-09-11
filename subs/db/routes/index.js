import express from "express";
 
import { 
    getAllBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog
} from "../controllers/Blogs.js";
 
const router = express.Router();
 
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);
 
export default router;