const { Blog, BlogBlock } = require("../models");
const makeUrl = require("../utils/fileUrl");

exports.getAll = async (req, res) => {
  const blogs = await Blog.findAll({ order: [["id", "DESC"]] });

  res.json(
    blogs.map((b) => ({
      ...b.toJSON(),
      image: makeUrl(b.image),
    }))
  );
};

exports.getOne = async (req, res) => {
  const blog = await Blog.findOne({
    where: { slug: req.params.slug },
    include: [{ model: BlogBlock, as: "content", order: [["order", "ASC"]] }],
  });

  if (!blog) return res.status(404).json({ message: "Not found" });

  res.json({
    ...blog.toJSON(),
    image: makeUrl(blog.image),
  });
};

exports.create = async (req, res) => {
  const { content, ...blogData } = req.body;
  const blog = await Blog.create(blogData);

  if (content?.length) {
    await BlogBlock.bulkCreate(
      content.map((b, index) => ({
        blogId: blog.id,
        type: b.type,
        text: b.text || null,
        items: b.items || null,
        order: index,
      }))
    );
  }

  res.status(201).json(blog);
};

exports.remove = async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};
