const Joi = require("joi");

const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

function createPostValidate(data) {
  const { error } = createPostSchema.validate(data);
  return error ? error.details[0].message : null;
}

module.exports = { createPostValidate };
