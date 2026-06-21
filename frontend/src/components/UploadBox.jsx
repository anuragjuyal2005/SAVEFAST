import { FolderUp } from "lucide-react";

const UploadBox = ({ onUpload }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    onUpload(formData);
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-white">Upload Your File</h2>
      <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-2xl shadow-sm border border-dashed border-gray-300">
        <FolderUp className="fill-gray-400 text-white w-40 h-40" />
        <p className="text-indigo-100 mb-1">Maximum file size: 10MB</p>
        <p className="text-indigo-600 mb-5">Supported format: PNG, PDF, JPG</p>
        <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow transition tracking-wider">
          Select files
          <input type="file" onChange={handleChange} hidden />
        </label>
      </div>
    </>
  );
};

export default UploadBox;
