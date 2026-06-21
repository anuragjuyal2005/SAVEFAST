import axios from "axios";

const API = "https://savefast-backend-4go7.onrender.com/api/files";

export const uploadFile = async (formData) => {
  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getFiles = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const deleteFile = async (id, code) => {
  const res = await axios.delete(`${API}/${id}`, {
    data: { code },
  });
  return res.data;
};
