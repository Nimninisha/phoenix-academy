"use client";

import { useState } from "react";
import PageLogo from "../../components/PageLogo";

// Subscription buttons with REAL prices (type-level)
const SubscriptionButtons = ({ planKind, onSubscribe }) => {
  const prices = {
  quiz: { monthly: 12.99, yearly: 99.99 },

  lab: { monthly: 19.99, yearly: 149.99 },

  "revision-library": {
    monthly: 14.99,
    yearly: 119.99,
  },
};

  const p = prices[planKind];
  if (!p) return null; // video has no subscription

  return (
    <div style={{ marginTop: "10px" }}>
      <button className="btn-primary" onClick={() => onSubscribe("monthly")}>
        Subscribe Monthly (€{p.monthly})
      </button>
      <button
        className="btn-secondary"
        style={{ marginLeft: "10px" }}
        onClick={() => onSubscribe("yearly")}
      >
        Subscribe Yearly (€{p.yearly})
      </button>
    </div>
  );
};

// Generate 10 items with first one free
const generateItems = (label) => {
  return Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    label: `${label} ${i + 1}`,
    free: i === 0,
  }));
};

// Digital Level 2
const digitalTypes = [
  {
    id: "quiz",
    name: "Quiz Simulations",
    planKind: "quiz",
    includeItaly: true,
  },
  {
    id: "lab",
    name: "Lab Simulations",
    planKind: "lab",
    includeItaly: false, // no Italy under lab
  },
  {
    id: "video",
    name: "Video Lessons",
    planKind: null, // no subscription
    includeItaly: true,
  },
];

// Printed Level 2
const printedTypes = [
  {
    id: "model",
    name: "Model Papers",
    planKind: "revision-library",
  },
  {
    id: "revision",
    name: "Revision Books",
    planKind: "revision-library",
  },
];

// Curriculums
const allCurriculums = [
  "Italy University Entrance Exams",
  "Cambridge English Qualifications",
  "CAIE",
  "AQA",
  "Pearson Edexcel",
  "IB Curriculum",
];

const curriculumsWithoutItaly = [
  "Cambridge English Qualifications",
  "CAIE",
  "AQA",
  "Pearson Edexcel",
  "IB Curriculum",
];

// Categories
const categoriesByCurriculum = {
  "Italy University Entrance Exams": ["IMAT", "TIL", "CISIA / TOLC", "CENT-S"],
  "Cambridge English Qualifications": [
    "A1 Young Learners",
    "A2",
    "B1",
    "B2",
    "IELTS",
  ],
  CAIE: ["IGCSE", "AS Level", "A Level"],
  AQA: ["GCSE", "AS Level", "A Level"],
  "Pearson Edexcel": ["IGCSE", "GCSE", "International A Level"],
  "IB Curriculum": ["MYP", "DP"],
};

// Cambridge subs
const cambridgeSubcategories = {
  "A1 Young Learners": ["Starters", "Movers", "Flyers"],
  A2: ["A2 Key (KET)"],
  B1: ["B1 Preliminary (PET)"],
  B2: ["B2 First (FCE)"],
  IELTS: ["Academic"],
};

// Subjects
const subjectsByBoard = {
  CAIE: {
    IGCSE: [
      "Mathematics",
      "Chemistry",
      "Physics",
      "Biology",
      "Combined Science",
      "English",
      "Psychology",
    ],
    "AS Level": [
      "Chemistry",
      "Physics",
      "Biology",
      "Psychology",
      "Mathematics",
    ],
    "A Level": [
      "Chemistry",
      "Physics",
      "Biology",
      "Psychology",
      "Mathematics",
      "Further Mathematics",
    ],
  },
  AQA: {
    GCSE: [
      "Mathematics",
      "Chemistry",
      "Physics",
      "Biology",
      "English",
      "Psychology",
    ],
    "AS Level": [
      "Chemistry",
      "Physics",
      "Biology",
      "Psychology",
      "Mathematics",
    ],
    "A Level": [
      "Chemistry",
      "Physics",
      "Biology",
      "Psychology",
      "Mathematics",
    ],
  },
  "Pearson Edexcel": {
    IGCSE: ["Mathematics", "Chemistry", "Physics", "Biology", "English"],
    GCSE: ["Mathematics", "Chemistry", "Physics", "Biology", "English"],
    "International A Level": [
      "Chemistry",
      "Physics",
      "Biology",
      "Mathematics",
      "Psychology",
    ],
  },
  "IB Curriculum": {
    MYP: ["Mathematics", "Science"],
    DP: ["Chemistry", "Physics", "Biology", "Psychology"],
  },
};

export default function StorePage() {
  const [activeRoot, setActiveRoot] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [activeCurriculum, setActiveCurriculum] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  
  const startCheckout = async (
  planKind,
  billingPeriod
) => {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planKind,
        billingPeriod,
      }),
    });

    const data = await res.json();

    console.log(
      "CHECKOUT RESPONSE:",
      data
    );

    if (!data.id) {
      alert(
        data.error || "Checkout error"
      );
      return;
    }
console.log("STEP A");
    const stripeModule = await import(
      "@stripe/stripe-js"
    );
console.log("STEP B", stripeModule);
    const stripe =
      await stripeModule.loadStripe(
        process.env
          .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
console.log("STEP C", stripe);
    if (!stripe) {
      alert("Stripe failed to load");
      return;
    }
console.log("STEP D");
    await stripe.redirectToCheckout({
      sessionId: data.id,
    });
    console.log("STEP E");
  } catch (error) {
    console.error(
      "CHECKOUT ERROR:",
      error
    );

    alert(
      "Checkout failed"
    );
  }
};

  const toggleRoot = (id) => {
    setActiveRoot(activeRoot === id ? null : id);
    setActiveType(null);
    setActiveCurriculum(null);
    setActiveCategory(null);
    setActiveSub(null);
  };

  const toggleType = (id) => {
    setActiveType(activeType === id ? null : id);
    setActiveCurriculum(null);
    setActiveCategory(null);
    setActiveSub(null);
  };

  const toggleCurriculum = (name) => {
    setActiveCurriculum(activeCurriculum === name ? null : name);
    setActiveCategory(null);
    setActiveSub(null);
  };

  const toggleCategory = (name) => {
    setActiveCategory(activeCategory === name ? null : name);
    setActiveSub(null);
  };

  const toggleSub = (name) => {
    setActiveSub(activeSub === name ? null : name);
  };

  return (
    <div className="page">
      <PageLogo title="Store" />

      <div className="courses-grid">
        {/* DIGITAL RESOURCES */}
        <div className="course-tile">
          <div
            className="course-tile-header"
            onClick={() => toggleRoot("digital")}
            style={{ cursor: "pointer" }}
          >
            <span className="course-icon">💻</span>
            <h2>Digital Resources</h2>
          </div>

          {activeRoot === "digital" && (
            <div className="course-tile-body-nested">
              {digitalTypes.map((type) => (
                <div key={type.id} className="course-category">
                  <button
                    className="course-category-title"
                    onClick={() => toggleType(type.id)}
                  >
                    {type.name}
                  </button>

                  {activeType === type.id && (
                    <div className="store-board-subjects">
                      {/* Subscription only for quiz/lab */}
                      <SubscriptionButtons
                        planKind={type.planKind}
                        onSubscribe={(billingPeriod) =>
                          startCheckout(type.planKind, billingPeriod)
                        }
                      />

                      <div className="course-category-chips">
                        {(type.includeItaly
                          ? allCurriculums
                          : curriculumsWithoutItaly
                        ).map((cur) => (
                          <div key={cur} className="store-board-block">
                            <button
                              className="store-board-title"
                              onClick={() => toggleCurriculum(cur)}
                            >
                              {cur}
                            </button>

                            {activeCurriculum === cur && (
                              <div className="store-board-subjects">
                                {categoriesByCurriculum[cur].map((cat) => (
                                  <div
                                    key={cat}
                                    className="store-board-block"
                                  >
                                    <button
                                      className="store-board-title"
                                      onClick={() => toggleCategory(cat)}
                                    >
                                      {cat}
                                    </button>

                                    {/* Cambridge English → subcategories */}
                                    {cur ===
                                      "Cambridge English Qualifications" &&
                                      activeCategory === cat && (
                                        <div className="store-board-subjects">
                                          {cambridgeSubcategories[cat].map(
                                            (sub) => (
                                              <div
                                                key={sub}
                                                className="store-board-block"
                                              >
                                                <button
                                                  className="store-board-title"
                                                  onClick={() =>
                                                    toggleSub(sub)
                                                  }
                                                >
                                                  {sub}
                                                </button>

                                                {activeSub === sub && (
                                                  <div className="store-board-subjects">
                                                    {generateItems(
                                                      type.id === "video"
                                                        ? "Video"
                                                        : "Simulation"
                                                    ).map((item) => (
                                                      <button
                                                        key={item.number}
                                                        className="course-chip"
                                                      >
                                                        {item.label}{" "}
                                                        {type.id === "video"
                                                          ? "(YouTube)"
                                                          : item.free
                                                          ? "(FREE)"
                                                          : "(Premium)"}
                                                      </button>
                                                    ))}
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}

                                    {/* CAIE / AQA / Edexcel / IB → subjects */}
                                    {["CAIE", "AQA", "Pearson Edexcel", "IB Curriculum"].includes(
                                      cur
                                    ) &&
                                      activeCategory === cat && (
                                        <div className="store-board-subjects">
                                          {subjectsByBoard[cur][cat].map(
                                            (subj) => (
                                              <div
                                                key={subj}
                                                className="store-board-block"
                                              >
                                                <button
                                                  className="store-board-title"
                                                  onClick={() =>
                                                    toggleSub(subj)
                                                  }
                                                >
                                                  {subj}
                                                </button>

                                                {activeSub === subj && (
                                                  <div className="store-board-subjects">
                                                    {generateItems(
                                                      type.id === "video"
                                                        ? "Video"
                                                        : "Simulation"
                                                    ).map((item) => (
                                                      <button
                                                        key={item.number}
                                                        className="course-chip"
                                                      >
                                                        {item.label}{" "}
                                                        {type.id === "video"
                                                          ? "(YouTube)"
                                                          : item.free
                                                          ? "(FREE)"
                                                          : "(Premium)"}
                                                      </button>
                                                    ))}
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}

                                    {/* Italy Exams → direct items */}
                                    {cur ===
                                      "Italy University Entrance Exams" &&
                                      activeCategory === cat &&
                                      type.includeItaly && (
                                        <div className="store-board-subjects">
                                          {generateItems(
                                            type.id === "video"
                                              ? "Video"
                                              : "Simulation"
                                          ).map((item) => (
                                            <button
                                              key={item.number}
                                              className="course-chip"
                                            >
                                              {item.label}{" "}
                                              {type.id === "video"
                                                ? "(YouTube)"
                                                : item.free
                                                ? "(FREE)"
                                                : "(Premium)"}
                                            </button>
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
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PRINTED RESOURCES */}
        <div className="course-tile">
          <div
            className="course-tile-header"
            onClick={() => toggleRoot("revision-library")}
            style={{ cursor: "pointer" }}
          >
            <span className="course-icon">📚</span>
            <h2>Premium Revision Library</h2>
          </div>

          {activeRoot === "revision-library" && (
            <div className="course-tile-body-nested">
              {printedTypes.map((type) => (
                <div key={type.id} className="course-category">
                  <button
                    className="course-category-title"
                    onClick={() => toggleType(type.id)}
                  >
                    {type.name}
                  </button>

                  {activeType === type.id && (
                    <div className="store-board-subjects">
                      <SubscriptionButtons
  planKind="revision-library"
  onSubscribe={(billingPeriod) =>
    startCheckout(
      "revision-library",
      billingPeriod
    )
  }
/>

                      <div className="course-category-chips">
                        {allCurriculums.map((cur) => (
                          <div key={cur} className="store-board-block">
                            <button
                              className="store-board-title"
                              onClick={() => toggleCurriculum(cur)}
                            >
                              {cur}
                            </button>

                            {activeCurriculum === cur && (
                              <div className="store-board-subjects">
                                {categoriesByCurriculum[cur].map((cat) => (
                                  <div
                                    key={cat}
                                    className="store-board-block"
                                  >
                                    <button
                                      className="store-board-title"
                                      onClick={() => toggleCategory(cat)}
                                    >
                                      {cat}
                                    </button>

                                    {/* Cambridge English → subcategories */}
                                    {cur ===
                                      "Cambridge English Qualifications" &&
                                      activeCategory === cat && (
                                        <div className="store-board-subjects">
                                          {cambridgeSubcategories[cat].map(
                                            (sub) => (
                                              <div
                                                key={sub}
                                                className="store-board-block"
                                              >
                                                <button
                                                  className="store-board-title"
                                                  onClick={() =>
                                                    toggleSub(sub)
                                                  }
                                                >
                                                  {sub}
                                                </button>

                                                {activeSub === sub && (
                                                  <div className="store-board-subjects">
                                                    {generateItems(
                                                      type.id === "model"
                                                        ? "Model Paper"
                                                        : "Revision Book"
                                                    ).map((item) => (
                                                      <button
                                                        key={item.number}
                                                        className="course-chip"
                                                      >
                                                        {item.label}{" "}
                                                        {item.free
                                                          ? "(FREE)"
                                                          : "(Premium)"}
                                                      </button>
                                                    ))}
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}

                                    {/* CAIE / AQA / Edexcel / IB → subjects */}
                                    {["CAIE", "AQA", "Pearson Edexcel", "IB Curriculum"].includes(
                                      cur
                                    ) &&
                                      activeCategory === cat && (
                                        <div className="store-board-subjects">
                                          {subjectsByBoard[cur][cat].map(
                                            (subj) => (
                                              <div
                                                key={subj}
                                                className="store-board-block"
                                              >
                                                <button
                                                  className="store-board-title"
                                                  onClick={() =>
                                                    toggleSub(subj)
                                                  }
                                                >
                                                  {subj}
                                                </button>

                                                {activeSub === subj && (
                                                  <div className="store-board-subjects">
                                                    {generateItems(
                                                      type.id === "model"
                                                        ? "Model Paper"
                                                        : "Revision Book"
                                                    ).map((item) => (
                                                      <button
                                                        key={item.number}
                                                        className="course-chip"
                                                      >
                                                        {item.label}{" "}
                                                        {item.free
                                                          ? "(FREE)"
                                                          : "(Premium)"}
                                                      </button>
                                                    ))}
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}

                                    {/* Italy Exams → direct items */}
                                    {cur ===
                                      "Italy University Entrance Exams" &&
                                      activeCategory === cat && (
                                        <div className="store-board-subjects">
                                          {generateItems(
                                            type.id === "model"
                                              ? "Model Paper"
                                              : "Revision Book"
                                          ).map((item) => (
                                            <button
                                              key={item.number}
                                              className="course-chip"
                                            >
                                              {item.label}{" "}
                                              {item.free
                                                ? "(FREE)"
                                                : "(Premium)"}
                                            </button>
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
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
