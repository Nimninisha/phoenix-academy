"use client";

import { useState } from "react";
import PageLogo from "../../components/PageLogo";

const curricula = [
  {
    id: "foundation",
    name: "Foundation Courses",
    icon: "🎓",
    type: "simple",
    level2: [
      "Science Foundation",
      "Engineering Foundation",
      "Business Foundation",
      "Health Sciences Foundation",
      "IT / Computer Science Foundation",
    ],
  },
  {
    id: "italy",
    name: "Italy University Entrance Exams",
    icon: "🇮🇹",
    type: "simple",
    level2: ["IMAT", "TIL", "CISIA / TOLC", "CENT-S"],
  },
  {
    id: "cambridge-english",
    name: "Cambridge English Qualifications",
    icon: "🇬🇧",
    type: "nested",
    level2: [
      { id: "a1-young", name: "A1 Young Learners", level3: ["Starters", "Movers", "Flyers"] },
      { id: "a2", name: "A2", level3: ["A2 Key (KET)"] },
      { id: "b1", name: "B1", level3: ["B1 Preliminary (PET)"] },
      { id: "b2", name: "B2", level3: ["B2 First (FCE)"] },
      { id: "ielts", name: "IELTS", level3: ["Academic"] },
    ],
  },
  {
    id: "caie",
    name: "Cambridge Assessment International Education (CAIE)",
    icon: "📘",
    type: "nested",
    level2: [
      {
        id: "igcse",
        name: "IGCSE",
        level3: ["Mathematics", "Chemistry", "Physics", "Biology", "Combined Science", "Psychology"],
      },
      {
        id: "as",
        name: "AS Level",
        level3: ["Chemistry", "Physics", "Biology", "Psychology", "Mathematics"],
      },
      {
        id: "al",
        name: "A Level",
        level3: ["Chemistry", "Physics", "Biology", "Psychology", "Mathematics", "Further Mathematics"],
      },
    ],
  },
  {
    id: "aqa",
    name: "AQA",
    icon: "📗",
    type: "nested",
    level2: [
      {
        id: "gcse",
        name: "GCSE",
        level3: ["Mathematics", "Chemistry", "Physics", "Biology", "English", "Psychology"],
      },
      {
        id: "as-aqa",
        name: "AS Level",
        level3: ["Chemistry", "Physics", "Biology", "Psychology", "Mathematics"],
      },
      {
        id: "al-aqa",
        name: "A Level",
        level3: ["Chemistry", "Physics", "Biology", "Psychology", "Mathematics"],
      },
    ],
  },
  {
    id: "edexcel",
    name: "Pearson Edexcel",
    icon: "📙",
    type: "nested",
    level2: [
      { id: "igcse-ed", name: "IGCSE", level3: ["Mathematics", "Chemistry", "Physics", "Biology", "English"] },
      { id: "gcse-ed", name: "GCSE", level3: ["Mathematics", "Chemistry", "Physics", "Biology", "English"] },
      { id: "ial-ed", name: "International A Level", level3: ["Chemistry", "Physics", "Biology", "Mathematics", "Psychology"] },
    ],
  },
  {
    id: "ib",
    name: "IB Curriculum",
    icon: "🌍",
    type: "nested",
    level2: [
      { id: "myp", name: "MYP", level3: ["Mathematics", "Science"] },
      { id: "dp", name: "DP", level3: ["Chemistry", "Physics", "Biology", "Psychology"] },
    ],
  },
];

export default function CoursesPage() {
  const [activeCurriculum, setActiveCurriculum] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCurriculumClick = (id) => {
    setActiveCurriculum(id === activeCurriculum ? null : id);
    setActiveCategory(null);
  };

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId === activeCategory ? null : catId);
  };

  return (
    <div className="home-royal-white">
      <PageLogo title="Courses" />

      <div className="courses-grid">
        {curricula.map((curriculum) => (
          <div key={curriculum.id} className="course-tile">
            
            {/* Level 1 */}
            <div
              className="course-tile-header"
              onClick={() => handleCurriculumClick(curriculum.id)}
              style={{ cursor: "pointer" }}
            >
              <span className="course-icon">{curriculum.icon}</span>
              <h2>{curriculum.name}</h2>
            </div>

            {/* Level 2 + Level 3 */}
            {activeCurriculum === curriculum.id && (
              <>
                {curriculum.type === "simple" && (
                  <div className="course-tile-body">
                    {curriculum.level2.map((item) => (
                      <button key={item} className="course-chip">
                        {item}
                      </button>
                    ))}
                  </div>
                )}

                {curriculum.type === "nested" && (
                  <div className="course-tile-body-nested">
                    {curriculum.level2.map((category) => (
                      <div key={category.id} className="course-category">
                        <button
                          className="course-category-title"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          {category.name}
                        </button>

                        {activeCategory === category.id && (
                          <div className="course-category-chips">
                            {category.level3.map((subject) => (
                              <button key={subject} className="course-chip">
                                {subject}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
