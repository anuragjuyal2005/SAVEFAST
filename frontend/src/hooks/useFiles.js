import { useEffect, useState } from "react";
import { getFiles, uploadFile, deleteFile } from "../services/fileServices.js";

const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getFiles();
      setFiles(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess("");

      const data = await uploadFile(formData);
      setFiles((prev) => [data.file, ...prev]);

      setSuccess(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, code) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess("");

      await deleteFile(id, code);
      setFiles((prev) => prev.filter((file) => file._id !== id));

      setSuccess("File deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    loading,
    success,
    error,
    upload: handleUpload,
    deleteFile: handleDelete,
    refetch: fetchFiles,
  };
};

export default useFiles;
