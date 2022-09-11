import Blog from "../models/blogModel.js";
import Sequelize from 'sequelize';
export const getAllBlogs = async (req, res) => {
    try {
        const Blogs = await Blog.findAll();
        res.json(Blogs);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getBlogById = async (req, res) => {
    try {
        console.log(req.params.id);
        if(req.params.id === 'min'){
            const Blogs = await Blog.findAll({
                attributes: [Sequelize.fn('min', Sequelize.col('amount'))],
                group: ["title"],
                raw: true,
            });
            res.json(Blogs);
        } 
        // else {
        //     const Blog = Blog.findAll({
        //         where: {
        //             id: req.params.id
        //         }
        //     }).then((result) =>{
                
        //     }).catch();
        //     console.log(Blog);
        //     res.json(Blog);
        // }
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createBlog = async (req, res) => {
    try {
        await Blog.create(req.body);
        res.json({
            "message": "Blog Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateBlog = async (req, res) => {
    try {
        await Blog.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Blog Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteBlog = async (req, res) => {
    try {
        await Blog.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Blog Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}