import express from 'express'
import {
    createBlog,
    deleteBlog,
    updateBlog,
    getUserBlogs,
    getBlogById,
    getAllBlogs,
    getAllBlogsByCatagory,
} from '../../controller/blog/blogController.js'

export const blogRouter = express.Router()

blogRouter.get('/all', getAllBlogs)
blogRouter.post('/all/category', getAllBlogsByCatagory)
blogRouter.post('/create', createBlog)
blogRouter.delete('/delete/:id', deleteBlog)
blogRouter.put('/update/:id', updateBlog)
blogRouter.get('/:authorId', getUserBlogs)
blogRouter.get('/blog/:blogId', getBlogById)
