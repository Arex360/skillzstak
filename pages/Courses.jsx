
import dynamic from "next/dynamic";
const  Courses = dynamic(() => import('./routes/Courses'));
export default function CoursePage(){
    return(
        <Courses></Courses>
    )
}