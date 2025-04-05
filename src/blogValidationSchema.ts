import { z } from 'zod';
import { Types } from 'mongoose';

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title must be provided and must be a string' })
      .min(3)
      .max(50),

    content: z
      .string({
        required_error: 'Content must be provided and must be a string',
      })
      .min(3)
      .max(250),

    author: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Author must be a valid ObjectId',
    }),

    isPublished: z
      .boolean({ required_error: 'isPublished must be a boolean' })
      .optional(),

    createdAt: z
      .date({ required_error: 'createdAt must be a valid date' })
      .optional(),

    updatedAt: z
      .date({ required_error: 'updatedAt must be a valid date' })
      .optional(),
  }),
});

export const BlogValidation = {
  blogValidationSchema,
};