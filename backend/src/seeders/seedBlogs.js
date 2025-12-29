const { Blog, BlogBlock } = require("../models");
const blogs = require("./data/blogs");

module.exports = async () => {
  for (const b of blogs) {
    const { content, ...blogData } = b;

    const blog = await Blog.create(blogData);

    if (Array.isArray(content)) {
      await BlogBlock.bulkCreate(
        content.map((block, index) => ({
          blogId: blog.id,
          type: block.type,
          text: block.text || null,
          items: block.items || null,
          order: index,
        }))
      );
    }
  }
};
