"use client";

import { useState, useEffect } from "react";

export default function AdminSimulationsPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [index, setIndex] = useState(1);
  const [free, setFree] = useState(false);
  const [list, setList] = useState([]);

  const loadSimulations = async () => {
    const res = await fetch("/api/admin/simulations");
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    loadSimulations();
  }, []);

  const upload = async () => {
    await fetch("/api/admin/simulations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, index, free }),
    });
    setTitle("");
    setCategory("");
    setIndex(1);
    setFree(false);
    await loadSimulations();
  };

  return (
    <div className="page">
      <h1>Admin – Upload Simulations</h1>

      <div className="courses-grid">
        <div className="course-tile">
          <h2>New Simulation</h2>
          <input
            placeholder="Title (e.g. IMAT Simulation 1)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Category (e.g. IMAT, A1-Starters)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            min={1}
            max={10}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
          />
          <label>
            <input
              type="checkbox"
              checked={free}
              onChange={(e) => setFree(e.target.checked)}
            />{" "}
            Free simulation
          </label>
          <button className="btn-primary" onClick={upload}>
            Upload
          </button>
        </div>

        <div className="course-tile">
          <h2>Existing Simulations</h2>
          <div className="course-tile-body-nested">
            {list.map((sim) => (
              <div key={sim._id} className="course-chip">
                {sim.title} – {sim.category} – #{sim.index}{" "}
                {sim.free ? "(FREE)" : "(Subscription)"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
