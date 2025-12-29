module.exports = (path) =>
  path ? `${process.env.BASE_URL}/uploads/${path}` : null;
