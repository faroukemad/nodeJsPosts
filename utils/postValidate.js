const VALID_CATEGORIES = ["Technology", "Health", "Travel"];

function validatePost({ title, content, category }) {
  if (!title || !content || !category)
    return "Title, content, and category are required.";
  if (!VALID_CATEGORIES.includes(category))
    return `Invalid category. Must be one of ${VALID_CATEGORIES.join(", ")}.`;
  return null;
}

module.exports = { validatePost, VALID_CATEGORIES };