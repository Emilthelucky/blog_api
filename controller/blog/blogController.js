import { blogModel } from '../../models/blog/blogModel.js'
import { imageModel } from '../../models/image/imageModel.js'
import { textModel } from '../../models/text/textModel.js'
import { responseError } from '../../utils/responseError.js'
import { responseSuccess } from '../../utils/responseSuccess.js'
import mongoose from 'mongoose'

export const createBlog = async (req, res) => {
    const { title, image, text, author, category } = req.body

    if (!title) {
        return responseError(res, 'Basliq daxil edin')
    }

    if (!category) {
        return responseError(res, 'Categoriya daxil edin')
    }

    let newBlog = new blogModel({ title, author, category })

    if (text) {
        const newText = await textModel.create({ text })
        newBlog.text = newText._id
    }

    if (image) {
        const newImage = await imageModel.create({ url: image })
        newBlog.image = newImage._id
    }

    await newBlog.save()

    newBlog = await blogModel
        .findById(newBlog._id)
        .populate('text')
        .populate('image')
        .populate('author')

    return responseSuccess(res, newBlog)
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return responseError(res, 'Invalid blog ID')
    }
    const deletedBlog = await blogModel.findByIdAndDelete(id)

    if (!deletedBlog) {
        return responseError(res, 'Blog tapilmadi')
    }

    return responseSuccess(res, 'Blog silindi')
}

// export const updateBlog = async (req, res) => {
//     const { id } = req.params
//     let { title, image, text } = req.body

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//         return responseError(res, 'Invalid blog ID')
//     }

//     let blogToUpdate = await blogModel
//         .findById(id)
//         .populate('text')
//         .populate('image')
//         .populate('author')

//     if (!blogToUpdate) {
//         return responseError(res, 'Blog not found')
//     }

//     if (title) blogToUpdate.title = title

//     if (text) {
//         let newText = await textModel.findOneAndUpdate({ text })
//         if (!newText) {
//             newText = await textModel.create({ text })
//         }
//         blogToUpdate.text = newText._id
//     }

//     if (image) {
//         let newImage = await imageModel.findOneAndUpdate({ url: image })
//         if (!newImage) {
//             newImage = await imageModel.create({ url: image })
//         }
//         blogToUpdate.image = newImage._id
//     }

//     blogToUpdate = await blogToUpdate.save()

//     blogToUpdate = await blogModel
//         .findById(blogToUpdate._id)
//         .populate('text')
//         .populate('image')
//         .populate('author')

//     return responseSuccess(res, blogToUpdate)
// }

export const updateBlog = async (req, res) => {
    const { id } = req.params
    const { title, image, text, category } = req.body

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return responseError(res, 'Invalid blog ID')
    }

    let blogToUpdate = await blogModel
        .findById(id)
        .populate('text')
        .populate('image')
        .populate('author')

    console.log(blogToUpdate)

    if (!blogToUpdate) {
        return responseError(res, 'Blog not found')
    }

    if (title) blogToUpdate.title = title
    if (category) blogToUpdate.category = category

    if (text) {
        if (blogToUpdate.text) {
            const currentText = await textModel.findById(blogToUpdate.text._id)
            console.log(currentText)
            await textModel.findByIdAndUpdate(blogToUpdate.text._id, { text })
            const afterText = await textModel.findById(blogToUpdate.text._id)
            console.log(afterText)
        } else {
            const currentImage = await imageModel.findById(
                blogToUpdate.image._id
            )
            console.log(currentImage)
            const newText = await textModel.create({ text })
            blogToUpdate.text = newText._id
        }
    }

    if (image) {
        if (blogToUpdate.image) {
            await imageModel.findByIdAndUpdate(blogToUpdate.image._id, {
                url: image,
            })
        } else {
            const newImage = await imageModel.create({ url: image })
            blogToUpdate.image = newImage._id
        }
    }

    await blogToUpdate.save()

    blogToUpdate = await blogModel
        .findById(blogToUpdate._id)
        .populate('text')
        .populate('image')
        .populate('author')

    return responseSuccess(res, blogToUpdate)
}

export const getUserBlogs = async (req, res) => {
    const author = req.params.authorId

    if (!author || !mongoose.Types.ObjectId.isValid(author)) {
        return responseError(res, 'Invalid author ID')
    }

    const blogs = await blogModel
        .find({ author })
        .populate('text')
        .populate('image')
        .populate('author')

    if (blogs.length === 0) {
        return responseError(res, 'No blogs found for this author')
    }

    return responseSuccess(res, blogs)
}

export const getBlogById = async (req, res) => {
    const blogId = req.params.blogId

    const blog = await blogModel
        .findById(blogId)
        .populate('text')
        .populate('image')
        .populate('author')

    if (!blog) {
        return responseError(res, 'No blog found')
    }

    return responseSuccess(res, blog)
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel
            .find()
            .sort({ createdAt: -1 })
            .populate('text')
            .populate('image')
            .populate('author')

        if (blogs.length === 0) {
            return responseError(res, 'No blogs found')
        }

        return responseSuccess(res, blogs)
    } catch (error) {
        return responseError(res, 'Error fetching blogs')
    }
}

export const getAllBlogsByCatagory = async (req, res) => {
    try {
        const { category } = req.body
        const blogs = await blogModel
            .find({ category })
            .sort({ createdAt: -1 })
            .populate('text')
            .populate('image')
            .populate('author')

        if (blogs.length === 0) {
            return responseError(res, 'No blogs found')
        }

        return responseSuccess(res, blogs)
    } catch (error) {
        return responseError(res, 'Error fetching blogs')
    }
}
