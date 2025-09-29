import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./contactsReducer";
import { useNavigate } from "react-router-dom";
import "./ListContacts.css";


function ListContacts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts, loading } = useSelector((state) => state.contactsState);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-container">
      <h2>Contacts List</h2>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Enrollment No</th> */}
            {/* <th>Branch</th> */}
            <th>Mobile</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            Object.entries(contacts).map(([id, contact]) => (
              <tr key={id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                {/* <td>{contact.enrollment}</td> */}
                {/* <td>{contact.branch}</td> */}
                <td>{contact.mobile}</td>
                <td>{contact.course}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* ✅ Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back
      </button>
    </div>
  );
}

export default ListContacts;
