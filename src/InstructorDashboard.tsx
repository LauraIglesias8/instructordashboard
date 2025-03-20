import React, { useState } from "react";

const InstructorDashboard = () => {
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "John Doe",
      lastCoached: "2025-03-15",
      comments: "Great progress!",
      score: 95,
      status: "Planned",
      isEditing: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      lastCoached: "2025-03-10",
      comments: "Needs improvement",
      score: 80,
      status: "Scheduled",
      isEditing: false,
    },
  ]);

  const [newInstructorName, setNewInstructorName] = useState("");

  const updateInstructor = (id: number, field: string, value: any) => {
    setInstructors((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, [field]: value } : inst))
    );
  };

  const toggleEdit = (id: number) => {
    setInstructors((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, isEditing: !inst.isEditing } : inst
      )
    );
  };

  const addInstructor = () => {
    if (!newInstructorName.trim()) return;

    const newInstructor = {
      id: instructors.length + 1,
      name: newInstructorName,
      lastCoached: "",
      comments: "",
      score: 0,
      status: "Planned",
      isEditing: false,
    };

    setInstructors([...instructors, newInstructor]);
    setNewInstructorName("");
  };

  const deleteInstructor = (id: number) => {
    setInstructors((prev) => prev.filter((inst) => inst.id !== id));
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'IBM Plex Sans', sans-serif",
        backgroundColor: "#e0f7fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#00796b", textAlign: "center" }}>
        Instructor Dashboard
      </h1>

      {/* Add Instructor */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter instructor name"
          value={newInstructorName}
          onChange={(e) => setNewInstructorName(e.target.value)}
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
        />
        <button
          onClick={addInstructor}
          style={{
            padding: "8px 12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Instructor
        </button>
      </div>

      {/* Instructor Boxes */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {instructors.map((inst) => (
          <div
            key={inst.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              width: "250px",
              borderRadius: "8px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              backgroundColor: "white",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Status Flag */}
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor:
                  inst.status === "Planned"
                    ? "#3498db"
                    : inst.status === "Scheduled"
                    ? "#f39c12"
                    : inst.status === "Conducted"
                    ? "#2ecc71"
                    : "#e74c3c",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {inst.status}
            </span>

            <h2>{inst.name}</h2>

            {/* Read-Only View */}
            {!inst.isEditing ? (
              <>
                <p>
                  <strong>Last Coached:</strong> {inst.lastCoached || "N/A"}
                </p>
                <p>
                  <strong>Score:</strong> {inst.score}
                </p>
                <p>
                  <strong>Comments:</strong> {inst.comments || "No comments"}
                </p>
              </>
            ) : (
              <>
                <label>
                  <strong>Last Coached:</strong>
                </label>
                <input
                  type="date"
                  value={inst.lastCoached}
                  onChange={(e) =>
                    updateInstructor(inst.id, "lastCoached", e.target.value)
                  }
                  style={{
                    display: "block",
                    margin: "5px auto",
                    padding: "5px",
                    width: "90%",
                  }}
                />

                <label>
                  <strong>Score:</strong>
                </label>
                <input
                  type="number"
                  value={inst.score}
                  onChange={(e) =>
                    updateInstructor(
                      inst.id,
                      "score",
                      parseInt(e.target.value) || 0
                    )
                  }
                  style={{
                    display: "block",
                    margin: "5px auto",
                    padding: "5px",
                    width: "90%",
                  }}
                />

                <label>
                  <strong>Comments:</strong>
                </label>
                <textarea
                  value={inst.comments}
                  onChange={(e) =>
                    updateInstructor(inst.id, "comments", e.target.value)
                  }
                  style={{
                    display: "block",
                    margin: "5px auto",
                    padding: "5px",
                    width: "90%",
                    height: "50px",
                  }}
                />
              </>
            )}

            {/* Status Dropdown */}
            <label>
              <strong>Status:</strong>
            </label>
            <select
              value={inst.status}
              onChange={(e) =>
                updateInstructor(inst.id, "status", e.target.value)
              }
              style={{
                display: "block",
                margin: "5px auto",
                padding: "5px",
                width: "90%",
              }}
            >
              <option value="Planned">Planned</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Conducted">Conducted</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Edit/Save Button */}
            <button
              onClick={() => toggleEdit(inst.id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                border: "none",
                backgroundColor: inst.isEditing ? "#28a745" : "#007bff",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {inst.isEditing ? "Save" : "Edit"}
            </button>

            {/* Delete Button */}
            <button
              onClick={() => deleteInstructor(inst.id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                border: "none",
                backgroundColor: "#e74c3c",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorDashboard;
