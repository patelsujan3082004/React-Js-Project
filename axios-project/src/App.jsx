import { useEffect, useState } from "react";
import "./App.css";
import { getAlbums, deleteAlbum, addAlbum, updateAlbum } from "./axios/API";

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    userId: 1, // albums API expects userId
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // ✅ Fetch all albums
  const getAlbumData = async () => {
    setLoading(true);
    try {
      const response = await getAlbums();
      console.log(response.data);
      setData(response.data.slice(0, 10)); // limit for demo
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete album
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await deleteAlbum(id);
      if (res.status === 200) {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting album:", error);
    } finally {
      setDeleting(null);
    }
  };

  // ✅ Add or Update album
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        // update existing album
        const res = await updateAlbum(editingId, formData);
        if (res.status === 200) {
          const updatedData = data.map((item) =>
            item.id === editingId ? res.data : item
          );
          setData(updatedData);
          setEditingId(null);
        }
      } else {
        // add new album
        const res = await addAlbum(formData);
        if (res.status === 201) {
          setData([...data, res.data]);
        }
      }

      // reset form
      setFormData({
        title: "",
        userId: 1,
      });
    } catch (error) {
      console.error("Error submitting album:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Edit album
  const handleEdit = (id) => {
    const editData = data.find((item) => item.id === id);
    setFormData({
      title: editData.title,
      userId: editData.userId,
    });
    setEditingId(id);
  };

  useEffect(() => {
    getAlbumData();
  }, []);

  return (
    <div className="app-container">
      <h1>Crud With Axios</h1>

      <section>
        <form onSubmit={handleSubmit} className={submitting ? "loading" : ""}>
          <input
            type="text"
            placeholder="Enter album title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            disabled={submitting}
            required
          />
          <button type="submit" disabled={submitting || !formData.title.trim()}>
            {submitting ? (
              <>
                <span className="spinner"></span>
                {editingId ? "UPDATING..." : "ADDING..."}
              </>
            ) : editingId ? (
              "UPDATE"
            ) : (
              "ADD"
            )}
          </button>
        </form>
      </section>

      <section className="table-section">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading albums...</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Title</th>
                <th>User ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="fade-in">
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.userId}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="action-button edit-button"
                      disabled={submitting || deleting === item.id}
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="action-button delete-button"
                      disabled={submitting || deleting === item.id}
                    >
                      {deleting === item.id ? (
                        <>
                          <span className="spinner"></span>
                          DELETING...
                        </>
                      ) : (
                        "DELETE"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
