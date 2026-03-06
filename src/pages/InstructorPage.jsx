import { INSTRUCTORS } from "../data/instructors";
import InstructorCard from "../components/ui/InstructorCard";

export default function InstructorPage(){

  return (

    <div style={{padding:"60px 24px",maxWidth:1000,margin:"0 auto"}}>

      <h1 style={{fontSize:30,marginBottom:20}}>
        Instructors
      </h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20}}>

        {INSTRUCTORS.map(i=>(
          <InstructorCard key={i.name} inst={i}/>
        ))}

      </div>

    </div>

  );

}