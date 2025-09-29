import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "./contactsReducer";
import { useNavigate } from "react-router-dom";
// import "./AddContact.css";
import './App.css'

function AddContact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    // enrollment: "",
    // branch: "",
    mobile: "",
    course: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(data));
    setData({
      name: "",
      email: "",
      enrollment: "",
      // branch: "",
      mobile: "",
      course: "",
    });

    navigate("/list"); // navigate after adding
  };

  return (
    <>
    <h2 className="head">REGISTRATION FORM</h2>
    <div className="card-container">
      <div className="form-card">
        <h2>Add Contact</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={data.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
          {/* <input type="text" name="enrollment" placeholder="Enrollment No" value={data.enrollment} onChange={handleChange} required /> */}
          {/* <input type="text" name="branch" placeholder="Branch" value={data.branch} onChange={handleChange} required /> */}
          <input type="tel" name="mobile" placeholder="Mobile Number" value={data.mobile} onChange={handleChange} required />
          <input type="text" name="course" placeholder="Course" value={data.course} onChange={handleChange} required />

          <button type="submit">Add Contact</button>
        </form>

        {/* ✅ Show Details Button */}
        <button className="secondary-btn" onClick={() => navigate("/list")}>
          Show Details
        </button>
      </div>
    </div>
    </>
  );
}

export default AddContact;
