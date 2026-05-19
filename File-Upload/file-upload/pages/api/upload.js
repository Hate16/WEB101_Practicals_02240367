import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: MAX_SIZE_BYTES,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Parse error:", err);
      return res.status(500).json({ error: "Upload failed: " + err.message });
    }

    const file = files.file;

    if (!file) {
      return res.status(400).json({ error: "No file received." });
    }

    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ error: "File type not allowed." });
    }

    return res.status(200).json({
      message: "File uploaded successfully!",
      filename: file.originalFilename,
      size: file.size,
      type: file.mimetype,
    });
  });
}