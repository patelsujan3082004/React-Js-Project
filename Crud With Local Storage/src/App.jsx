import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/crud.css'

function App() {
  const defaultData = [
    { id: 1, firstName: "Janvi", lastName: "Desai", salary: 1000, age: 60 },
    { id: 2, firstName: "Manasvi", lastName: "Jethavat", salary: 2000, age: 20 },
    { id: 3, firstName: "Meet", lastName: "Patel", salary: 4000, age: 25 }
  ];

  const [data, setData] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [form, setForm] = useState({ id: null, firstName: "", lastName: "", salary: "", age: "" });

  // Load data from localStorage or use default
  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      setData(defaultData);
      localStorage.setItem("employees", JSON.stringify(defaultData));
    }
  }, []);

  // Save to localStorage
  const saveToLocal = (newData) => {
    setData(newData);
    localStorage.setItem("employees", JSON.stringify(newData));
  };

  // Handle add or update
  const handleSubmit = () => {
    if (updateMode) {
      const updated = data.map((item) =>
        item.id === form.id ? { ...form } : item
      );
      saveToLocal(updated);
    } else {
      const newItem = {
        ...form,
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1
      };
      saveToLocal([...data, newItem]);
    }
    setForm({ id: null, firstName: "", lastName: "", salary: "", age: "" });
    setUpdateMode(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setUpdateMode(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      const filtered = data.filter((item) => item.id !== id);
      saveToLocal(filtered);
    }
  };

  const handleClear = () => {
    setForm({ id: null, firstName: "", lastName: "", salary: "", age: "" });
    setUpdateMode(false);
  };

  return (
    <div className="container mt-4">

      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>
        <div className="col d-flex gap-2">
          <button className="btn btn-success" onClick={handleSubmit}>
            {updateMode ? "Update" : "Add"}
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Salary</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.salary}</td>
              <td>{emp.age}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(emp)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;