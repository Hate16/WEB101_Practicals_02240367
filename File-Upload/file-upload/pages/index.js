import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  const validateAndSet = (file) => {
    clearErrors("file");
    setMessage("");
    setProgress(0);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("file", { message: "Invalid file type. Only JPEG, PNG, GIF, PDF allowed." });
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("file", { message: "File too large. Max size is 5MB." });
      return;
    }
    setSelectedFile(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) validateAndSet(acceptedFiles[0]);
    },
  });

  const onSubmit = async () => {
    if (!selectedFile) {
      setError("file", { message: "Please select a file first." });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      setMessage("");
      setProgress(0);

      // ✅ Pointing to Express backend on port 8000
      const res = await axios.post("http://localhost:8000/api/upload", formData, {
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setIsError(false);
      setMessage(
        "✅ " + res.data.message +
        " | File: " + res.data.originalName +
        " | Size: " + (res.data.size / 1024).toFixed(1) + " KB"
      );
      setSelectedFile(null);
      setProgress(0);
    } catch (err) {
      setIsError(true);
      setMessage("❌ " + (err.response?.data?.error || "Upload failed."));
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>File Upload</h1>
        <p style={styles.sub}>JPEG · PNG · GIF · PDF | Max 5MB</p>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Drag & Drop Zone */}
          <div
            {...getRootProps()}
            style={{
              ...styles.dropzone,
              borderColor: isDragActive ? "#4f6ef7" : selectedFile ? "#4caf50" : "#ccc",
              background: isDragActive ? "#eef1ff" : selectedFile ? "#f3fff4" : "#fafafa",
            }}
          >
            <input {...getInputProps()} />
            {selectedFile ? (
              <p style={styles.dropText}>
                📄 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            ) : (
              <>
                <p style={styles.dropText}>
                  {isDragActive ? "Drop it here!" : "Drag & drop a file here"}
                </p>
                <p style={{ margin: "8px 0", color: "#aaa", fontSize: "0.85rem" }}>or</p>
                <span style={styles.browseBtn}>Choose File</span>
              </>
            )}
          </div>

          {/* Validation Error */}
          {errors.file && (
            <p style={styles.errorText}>{errors.file.message}</p>
          )}

          {/* Progress Bar */}
          {progress > 0 && (
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
          )}

          {/* Status Message */}
          {message && (
            <p style={{ ...styles.message, color: isError ? "#c62828" : "#2e7d32" }}>
              {message}
            </p>
          )}

          {/* Buttons */}
          <div style={styles.btnRow}>
            {selectedFile && (
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setProgress(0);
                  setMessage("");
                  clearErrors("file");
                }}
                style={styles.clearBtn}
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              disabled={uploading}
              style={{
                ...styles.uploadBtn,
                opacity: uploading ? 0.6 : 1,
                cursor: uploading ? "not-allowed" : "pointer",
              }}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f4ff",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: 480,
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },
  title: {
    margin: "0 0 4px",
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#1a1a2e",
  },
  sub: {
    margin: "0 0 1.5rem",
    fontSize: "0.85rem",
    color: "#888",
  },
  dropzone: {
    border: "2px dashed #ccc",
    borderRadius: 12,
    padding: "2rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    minHeight: 140,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dropText: {
    margin: 0,
    color: "#555",
    fontSize: "0.95rem",
  },
  browseBtn: {
    background: "#4f6ef7",
    color: "#fff",
    padding: "0.4rem 1.2rem",
    borderRadius: 8,
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 4,
  },
  errorText: {
    color: "#e53935",
    fontSize: "0.85rem",
    marginTop: 8,
  },
  progressBar: {
    marginTop: 16,
    height: 8,
    background: "#e0e0e0",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #4f6ef7, #7c3aed)",
    borderRadius: 99,
    transition: "width 0.2s",
  },
  message: {
    marginTop: 12,
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  btnRow: {
    display: "flex",
    gap: 12,
    marginTop: 20,
  },
  uploadBtn: {
    flex: 1,
    background: "#4f6ef7",
    color: "#fff",
    border: "none",
    padding: "0.75rem",
    borderRadius: 10,
    fontSize: "1rem",
    fontWeight: 600,
  },
  clearBtn: {
    background: "#f0f0f0",
    color: "#555",
    border: "none",
    padding: "0.75rem 1.25rem",
    borderRadius: 10,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};