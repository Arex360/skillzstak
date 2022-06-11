
import dynamic from "next/dynamic";
const  Courses = dynamic(() => import('./routes/PublicCoursePage'));
export default function CoursePage(){
    return(
        <Courses></Courses>
    )
}