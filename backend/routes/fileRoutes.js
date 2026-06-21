import express from "express";
import {
  uploadFile,
  getFiles,
  deleteFile,
  downloadFile,
} from "../controllers/fileControllers.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/download/:id", downloadFile);
router.delete("/:id", deleteFile);

export default router;
