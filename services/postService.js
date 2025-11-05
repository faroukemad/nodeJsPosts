const Post = require("../models/post");

exports.create = async (data) => {
  const post = new Post(data);
  await post.save();
  return post;
};

exports.findAll = async (filter) => {
  return Post.find(filter);
};
exports.findById = async (id) => {
    return Post.findById(id);
  };
exports.update = async (post, data) => {
  Object.assign(post, data);
  await post.save();
  return post;
};
exports.delete = async (id) => {
  return Post.findByIdAndDelete(id);
};
