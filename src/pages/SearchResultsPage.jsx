import { useState, useEffect } from "react";
import { COURSES } from "../data/courses";
import { WORKSHOPS } from "../data/workshops";
import CourseCard from "../components/ui/CourseCard";
import WorkshopCard from "../components/ui/WorkshopCard";
import { T } from "../styles/tokens";

const s = {
  display: (size=32, extra={}) => ({ fontFamily:"'Poppins',sans-serif", fontSize:size, fontWeight:800, letterSpacing:"-0.04em", color:T.white, lineHeight:1.08, ...extra }),
  mono: (size=12, extra={}) => ({ fontFamily:"'Roboto Mono',monospace", fontSize:size, ...extra }),
};

export default function SearchResultsPage({ query, onCourse, onRegister }) {
  const [q, setQ] = useState(query || "");

  useEffect(() => {
    setQ(query || "");
  }, [query]);

  const matchesCourses = COURSES.filter(c =>
    c.title.toLowerCase().includes(q.toLowerCase()) ||
    c.cat.toLowerCase().includes(q.toLowerCase()) ||
    c.desc.toLowerCase().includes(q.toLowerCase())
  );

  const matchesWorkshops = WORKSHOPS.filter(w =>
    w.title.toLowerCase().includes(q.toLowerCase()) ||
    w.instructor.toLowerCase().includes(q.toLowerCase())
  );

  const hasResults = matchesCourses.length > 0 || matchesWorkshops.length > 0;

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 28px 72px" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={s.display(40)}>Search Results</h1>
        {q && (
          <div style={{ ...s.mono(11), color:T.muted2, marginTop:6 }}>
            — Found {matchesCourses.length} courses and {matchesWorkshops.length} workshops for "{q}"
          </div>
        )}
      </div>

      {!hasResults ? (
        <div style={{ textAlign:"center", padding:"80px 20px", color:T.muted2 }}>
          <div style={{ fontSize:40, marginBottom:14 }}>◎</div>
          <p>No courses or workshops match your search.</p>
        </div>
      ) : (
        <>
          {/* Courses Section */}
          {matchesCourses.length > 0 && (
            <div style={{ marginBottom:48 }}>
              <h2 style={s.display(24, { marginBottom:20 })}>Courses</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:20 }}>
                {matchesCourses.map(c => (
                  <CourseCard key={c.id} c={c} onClick={() => onCourse(c.id)} />
                ))}
              </div>
            </div>
          )}

          {/* Workshops Section */}
          {matchesWorkshops.length > 0 && (
            <div>
              <h2 style={s.display(24, { marginBottom:20 })}>Workshops</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:20 }}>
                {matchesWorkshops.map((w, i) => (
                  <WorkshopCard key={i} w={w} onRegister={() => onRegister(w)} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
