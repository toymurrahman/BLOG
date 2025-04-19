import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IBlog } from './blog.interface';
import Blog from './blog.model';
import QueryBuilder from '../../builder/queryBuilder';

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  await result.populate('author');
  return result;
};

const updateBlog = async (id: string, updateData: Partial<IBlog>) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (blog.author.toString() !== updateData.author?.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }

  blog.title = updateData.title  blog.title;
  blog.content = updateData.content  blog.content;

  await blog.save();

  await blog.populate('author');

  return blog;
};

//Delete a blog by user
const deleteBlogByUser = async (blogId: string, authorId: string) => {
  if (!authorId) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Author ID is missing');
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (blog.author.toString() !== authorId.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }

  await Blog.findByIdAndDelete(blogId);

  return blog;
};

// Admin Delete Blog
const deleteBlogByAdmin = async (blogId: string) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  await Blog.findByIdAndDelete(blogId);
  return blog;
};

//Get all blogs
const getAllBlogs = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Blog.find(), query);

  //search
  queryBuilder.search(['title', 'content']);

  //filtering
  queryBuilder.filter();

  //sorting
  queryBuilder.sort();

  queryBuilder.select();
  const result = await queryBuilder.modelQuery.populate('author', 'name email');

  return result;
};

export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlogByUser,
  getAllBlogs,
  deleteBlogByAdmin,
};