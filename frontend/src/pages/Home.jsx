import { useState } from "react";
import UploadBox from "../components/UploadBox";
import FileCard from "../components/FileCard";
import DeleteModal from "../components/DeleteModal";
import useFiles from "../hooks/useFiles";

const Home = () => {
  const { files, upload, deleteFile, loading, error, success } = useFiles();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const handleDeleteConfirm = (code) => {
    deleteFile(selectedId, code);
  };

  const totalStorage = (
    files.reduce((acc, file) => acc + file.fileSize, 0) /
    (1024 * 1024)
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-200 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">
            SaveFile
          </h1>

          <p className="text-lg text-gray-600">
            Upload, Store, Download & Manage Files Securely
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
          <UploadBox onUpload={upload} />
        </div>

        {/* Alerts */}
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="loader w-8"></div>
          </div>
        )}

        {success && (
          <p className="text-center mt-6 text-lg text-green-600 font-medium">
            {success}
          </p>
        )}

        {error && (
          <p className="text-center mt-6 text-lg text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white">
            <p className="text-gray-500">Total Files</p>
            <h3 className="text-3xl font-bold text-indigo-600">
              {files.length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-500">Storage Used</p>
            <h3 className="text-3xl font-bold text-blue-600">
              {totalStorage} MB
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-500">Status</p>
            <h3 className="text-3xl font-bold text-green-600">Active</h3>
          </div>
        </div>

        {/* Recent Files */}
        <h2 className="text-3xl font-bold mt-12 mb-2 text-gray-800">
          Recent Files
        </h2>

        <p className="text-gray-500 mb-6">
          Manage all your uploaded documents from one place.
        </p>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          {files.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-700">
                No files uploaded yet
              </h3>
              <p className="text-gray-500 mt-2">
                Upload your first file to get started.
              </p>
            </div>
          ) : (
            <>
              <div className="py-4 flex justify-between px-6 border-b bg-gray-50 font-semibold">
                <span>File Name</span>
                <span>Date Uploaded</span>
                <span>Actions</span>
              </div>

              {files.map((file) => (
                <FileCard key={file._id} file={file} openModal={openModal} />
              ))}
            </>
          )}
        </div>

        <DeleteModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleDeleteConfirm}
        />

        {/* Footer */}
        <footer className="text-center mt-16 text-slate-600 font-medium">
          <p>© 2026 SaveFile • Secure File Storage Platform</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
