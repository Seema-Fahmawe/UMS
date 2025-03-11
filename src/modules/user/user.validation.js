import Joi from "joi";

export const deleteUser = Joi.object({
  userId: Joi.number().required(),
});
