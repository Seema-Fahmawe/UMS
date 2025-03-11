import Joi from "joi";

export const createBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const getSpecificBlog = Joi.object({
  blogId: Joi.string().required(),
});

export const deleteBlog = Joi.object({
  blogId: Joi.string().required(),
});

export const updateBlog = Joi.object({
  blogId: Joi.number().required(),
  title: Joi.string(),
  description: Joi.string(),
});
