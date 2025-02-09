import React, { useEffect, useState } from "react";
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "./services/StudentService";
import "./Style.css";
import StudentForm from './component/StudentForm';
import StudentTable from './component/StudentTable';

const App = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nim: "",
    namaDepan: "",
    namaBelakang: "",
    tanggalLahir: "",
  });
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);  
  const [studentToDelete, setStudentToDelete] = useState(null);  

  useEffect(() => {
    fetchStudentsList();
  }, []);

  const fetchStudentsList = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const handleSubmit = async (student) => {
    try {
      if (editing) {
        await updateStudent(form.id, student);
      } else {
        await addStudent(student);
      }
      fetchStudentsList();
      closeModal();  
    } catch (error) {
      console.error("Error saving student", error);
    }
  };

  const handleEdit = (student) => {
    setForm(student);  
    setEditing(true);   
    setModalOpen(true); 
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);  
    setDeleteModalOpen(true); 
  };
  

  const handleDeleteConfirm = async () => {
    try {
      if (studentToDelete?.id) {
        await deleteStudent(studentToDelete.id);  
        fetchStudentsList();  
        setDeleteModalOpen(false);  
      } else {
        console.error("No student selected for deletion");
      }
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };
  
  const openModal = () => {
    if (!editing) {
      setForm({ id: "", nim: "", namaDepan: "", namaBelakang: "", tanggalLahir: "" });  
    }
    setModalOpen(true);  
  };

  const closeModal = () => {
    setModalOpen(false); 
    setEditing(false);
  };

  return (
    <div className="container">
      <h1>Universitas Gadjah Mangap</h1>
      <button className="add-student" onClick={openModal}>+ Add Student</button>

      {}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{editing ? "Edit Student" : "Add Student"}</h2>
            <StudentForm 
              form={form}
              setForm={setForm}
              editing={editing}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setDeleteModalOpen(false)}>&times;</span>
            <h2>Are you sure?</h2>
            <p>You are about to delete <b>{studentToDelete?.namaDepan} {studentToDelete?.namaBelakang}</b>.</p>
            <div className="modal-buttons">
              <button className="delete" onClick={handleDeleteConfirm}>Yes, Delete</button>
              <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
