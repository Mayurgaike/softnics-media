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
  try {
    const body = req.body || {};
    const content =
      typeof body.content === "string"
        ? JSON.parse(body.content)
        : body.content;

    const blog = await Blog.create({
      title: body.title,
      slug: body.slug,
      image: req.file ? `blogs/${req.file.filename}` : null,
      date: body.date,
      readTime: body.readTime,
      shortDesc: body.shortDesc,
    });

    if (Array.isArray(content)) {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

exports.remove = async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const content =
      typeof body.content === "string"
        ? JSON.parse(body.content)
        : body.content;

    const updates = {
      title: body.title,
      slug: body.slug,
      date: body.date,
      readTime: body.readTime,
      shortDesc: body.shortDesc,
    };

    if (req.file) {
      updates.image = `blogs/${req.file.filename}`;
    }

    const [updated] = await Blog.update(updates, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: "Blog not updated" });
    }

    if (Array.isArray(content)) {
      await BlogBlock.destroy({ where: { blogId: id } });

      await BlogBlock.bulkCreate(
        content.map((b, index) => ({
          blogId: id,
          type: b.type,
          text: b.text || null,
          items: b.items || null,
          order: index,
        }))
      );
    }

    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update blog" });
  }
};
