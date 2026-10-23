import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Typography } from "@mui/material";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  height = 450,
  label = "Content",
  helperText = "",
  error = false,
}) => {
  const editorRef = useRef(null);

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: error ? "error.main" : "text.primary",
          }}
        >
          {label}
        </Typography>
      )}

      <Box
        sx={{
          border: error ? "1px solid #d32f2f" : "1px solid #cbd5e1",
          borderRadius: "6px",
          overflow: "hidden",
          "&:focus-within": {
            borderColor: error ? "#d32f2f" : "#2563eb",
            boxShadow: error
              ? "0 0 0 2px rgba(211,47,47,0.2)"
              : "0 0 0 2px rgba(37,99,235,0.2)",
          },
        }}
      >
        <Editor
          licenseKey="gpl"
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={value || ""}
          onEditorChange={(newContent) => onChange(newContent)}
          init={{
            license_key: "gpl",
            height,
            menubar: true,
            placeholder,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic underline strikethrough | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image media table | " +
              "code preview fullscreen | removeformat",
            content_style:
              "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b; padding: 12px; } " +
              "h1, h2, h3, h4, h5, h6 { color: #0f172a; font-weight: 700; margin-top: 1.2em; margin-bottom: 0.6em; } " +
              "img { max-width: 100%; height: auto; border-radius: 6px; } " +
              "table { border-collapse: collapse; width: 100%; } " +
              "table, th, td { border: 1px solid #e2e8f0; padding: 8px; }",
            branding: false,
            promotion: false,
            image_advtab: true,
            link_default_target: "_blank",
            default_link_target: "_blank",
            link_assume_external_targets: true,
            target_list: [
              { title: "New window", value: "_blank" },
              { title: "Same window", value: "" },
            ],
            relative_urls: false,
            remove_script_host: false,
            convert_urls: true,
          }}
        />
      </Box>

      {helperText && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 0.5,
            color: error ? "error.main" : "text.secondary",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default RichTextEditor;

