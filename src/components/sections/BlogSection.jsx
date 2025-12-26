import React from "react";
import { blogs } from "../data/blogs";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const latest = blogs.slice(0, 3);

  return (
    <section style={{ padding: "60px 0" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Latest Blogs
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px"
      }}>
        {latest.map((blog) => (
          <div
            key={blog.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px" }}>
              <h3>{blog.title}</h3>
              <p>{blog.shortDesc}</p>

              <Link to={`/blog/${blog.slug}`} style={{ color: "blue" }}>
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/blogs" style={{ fontSize: "18px" }}>
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
