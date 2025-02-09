import axios from "axios";

const API_URL = "http://localhost:8080/students";

export const fetchStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching students: " + error.message);
  }
};

export const addStudent = async (student) => {
  try {
    const response = await axios.post(API_URL, student);
    return response.data;
  } catch (error) {
    throw new Error("Error adding student: " + error.message);
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, student);
    return response.data;
  } catch (error) {
    throw new Error("Error updating student: " + error.message);
  }
};

export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error("Error deleting student: " + error.message);
  }
};
