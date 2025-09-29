import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddContact from "./AddContact";
import ListContacts from "./ListContacts";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddContact />} />
        <Route path="/list" element={<ListContacts />} />
      </Routes>
    </Router>
  );
}

export default App;
