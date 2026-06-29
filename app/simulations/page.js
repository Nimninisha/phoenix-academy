"use client";

import { useState } from "react";
import PageLogo from "../../components/PageLogo";

// Generate 10 simulations with first one free
const generateSimulations = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    free: i === 0,
  }));
};

// LEVEL 3 + LEVEL 4 categories
const categories = {
  "Italy University Entrance Exams": [
    { id: "imat", name: "IMAT" },
    { id: "til", name: "TIL" },
    { id: "tolc", name: "CISIA / TOLC" },
    { id: "cent-s", name: "CENT-S" },
  ],

  "Cambridge English Qualifications": [
    {
      id: "a1",
      name: "A1 Young Learners",
      subjects: ["Starters", "Movers", "Flyers"],
    },
    {
      id: "a2",
      name: "A2",
      subjects: ["A2 Key (KET)"],
    },
    {
      id: "b1",
      name: "B1",
      subjects: ["B1 Preliminary (PET)"],
    },
    {
      id: "b2",
      name: "B2",
      subjects: ["B2 First (FCE)"],
    },
    {
      id: "ielts",
      name: "IELTS",
      subjects: ["Academic"],
    },
  ],
};

// LEVEL 1 + LEVEL 2
const simulations = [
  {
    id: "quiz",
    name: "Quiz Simulations",
    icon: "🧠",
    level2: [
      "Italy University Entrance Exams",
      "Cambridge English Qualifications",
    ],
  },
  {
    id: "lab",
    name: "Laboratory Simulations",
    icon: "🧪",
    level2: [
      "Italy University Entrance Exams",
      "Cambridge English Qualifications",
    ],
  },
];

export default function SimulationsPage() {
  const [activeL1, setActiveL1] = useState(null);
  const [activeL2, setActiveL2] = useState(null);
  const [activeL3, setActiveL3] = useState(null);

  const toggleL1 = (id) => {
    setActiveL1(id === activeL1 ? null : id);
    setActiveL2(null);
    setActiveL3(null);
  };

  const toggleL2 = (name) => {
    setActiveL2(name === activeL2 ? null : name);
    setActiveL3(null);
  };

  const toggleL3 = (id) => {
    setActiveL3(id === activeL3 ? null : id);
  };

  return (
    <div className="page">
      <PageLogo title="Simulations" />

      <div className="courses-grid">
        {simulations.map((sim) => (
          <div key={sim.id} className="course-tile">
            {/* LEVEL 1 */}
            <div
              className="course-tile-header"
              onClick={() => toggleL1(sim.id)}
              style={{ cursor: "pointer" }}
            >
              <span className="course-icon">{sim.icon}</span>
              <h2>{sim.name}</h2>
            </div>

            {/* LEVEL 2 */}
            {activeL1 === sim.id && (
              <div className="course-tile-body-nested">
                {sim.level2.map((l2) => (
                  <div key={l2} className="course-category">
                    <button
                      className="course-category-title"
                      onClick={() => toggleL2(l2)}
                    >
                      {l2}
                    </button>

                    {/* LEVEL 3 */}
                    {activeL2 === l2 && (
                      <div className="course-category-chips">
                        {categories[l2].map((cat) => (
                          <div key={cat.id} className="store-board-block">
                            <button
                              className="store-board-title"
                              onClick={() => toggleL3(cat.id)}
                            >
                              {cat.name}
                            </button>

                            {/* ITALY → NO LEVEL 4 */}
                            {activeL3 === cat.id &&
                              l2 === "Italy University Entrance Exams" && (
                                <div className="store-board-subjects">
                                  {generateSimulations().map((sim) => (
                                    <button
                                      key={sim.number}
                                      className="course-chip"
                                    >
                                      Simulation {sim.number}{" "}
                                      {sim.free
                                        ? "(FREE)"
                                        : "(Subscription)"}
                                    </button>
                                  ))}
                                </div>
                              )}

                            {/* CAMBRIDGE → LEVEL 4 */}
                            {activeL3 === cat.id &&
                              l2 === "Cambridge English Qualifications" && (
                                <div className="store-board-subjects">
                                  {cat.subjects.map((sub) => (
                                    <div
                                      key={sub}
                                      className="store-board-block"
                                    >
                                      <h4>{sub}</h4>
                                      {generateSimulations().map((sim) => (
                                        <button
                                          key={sim.number}
                                          className="course-chip"
                                        >
                                          Simulation {sim.number}{" "}
                                          {sim.free
                                            ? "(FREE)"
                                            : "(Subscription)"}
                                        </button>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
