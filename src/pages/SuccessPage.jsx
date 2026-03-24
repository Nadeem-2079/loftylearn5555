export default function SuccessPage(){

  return (

    <div style={{padding:"80px 24px",textAlign:"center"}}>

      <div style={{ color: T.green, marginBottom: 24, display: "flex", justifyContent: "center" }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <h1 style={{ fontSize: 36, marginBottom: 16, color: T.white, fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}>
        Enrollment Successful
      </h1>

      <p>
        You now have access to the course.
      </p>

    </div>

  );

}