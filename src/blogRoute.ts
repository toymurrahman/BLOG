import { Router } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../app/middlewares/auth';

const blogRouter = Router();

// Create Blog route
blogRouter.post(
  '/blogs',
  auth('user'),
  validateRequest(BlogValidation.blogValidationSchema),
  BlogController.createBlog,
);

// Update Blog route
blogRouter.patch(
  '/blogs/:id',
  auth('user'),
  validateRequest(BlogValidation.blogValidationSchema),
  BlogController.updateBlog,
);

//Route for users to delete a blog
blogRouter.delete('/blogs/:id', auth('user'), BlogController.deleteBlogByUser);

//Get all blogs
blogRouter.get('/blogs', BlogController.getAllBlogs);

// Route for admins to delete any blog
blogRouter.delete(
  '/admin/blogs/:id',
  auth('admin'),
  BlogController.deleteBlogByAdmin,
);

export default blogRouter;