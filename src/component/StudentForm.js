import React from "react";

const StudentForm = ({ form, setForm, editing, onSubmit }) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);  
    setForm({ id: "", nim: "", namaDepan: "", namaBelakang: "", tanggalLahir: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nim"
        placeholder="NIM"
        value={form.nim}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="namaDepan"
        placeholder="First Name"
        value={form.namaDepan}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="namaBelakang"
        placeholder="Last Name"
        value={form.namaBelakang}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="tanggalLahir"
        value={form.tanggalLahir}
        onChange={handleChange}
        required
      />
      <button type="submit">{editing ? "Update" : "Add"}</button>
    </form>
  );
};

export default StudentForm;
