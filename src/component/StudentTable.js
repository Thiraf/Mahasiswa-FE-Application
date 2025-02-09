import React from "react";

const StudentTable = ({ students, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>NIM</th>
        <th>Full Name</th>
        <th>Age</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.nim}</td>
          <td>{student.namaDepan} {student.namaBelakang}</td>
          <td>{student.usia}</td>
          <td className="action-buttons">
            <button className="edit" onClick={() => onEdit(student)}>Edit</button>
            <button className="delete" onClick={() => onDelete(student)}>Delete</button> {}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);


export default StudentTable;
