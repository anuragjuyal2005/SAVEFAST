import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import File from "../models/File.js";
import streamifier from "streamifier";

const getFileType = (mimetype) => {
  if (mimetype.startsWith("image")) return "image";
  if (mimetype === "application/pdf") return "pdf";
  return "other";
};

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, mimetype, size, buffer } = file;

    const fileType = getFileType(mimetype);

    const deleteCode = Math.floor(1000 + Math.random() * 9000).toString();

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: mimetype === "application/pdf" ? "raw" : "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });

    const newFile = await File.create({
      fileName: originalname,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileType,
      fileSize: size,
      deleteCode,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
      deleteCode,
    });
  } catch (err) {
    res.status(500).json({ message: "UPLOAD ERROR" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) return res.status(404).json({ message: "File not found" });

    const response = await axios.get(file.fileUrl, { responseType: "stream" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.fileName}"`,
    );
    res.setHeader("Content-Type", "application/octet-stream");

    response.data.pipe(res);
  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);
    res.status(500).json({ message: "Download failed" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (code !== file.deleteCode) {
      return res.status(400).json({ message: "Invalid delete code" });
    }

    await cloudinary.uploader.destroy(file.publicId);

    await File.findByIdAndDelete(id);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
