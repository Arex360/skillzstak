import dynamic from 'next/dynamic'
import Script from 'next/script'
const PublicCourse = dynamic(()=> import('./routes/PublicCoursePage'))
export default function PublicCourses(){
    return(
        <>
            <Script defer={true} src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.3/web3.min.js" crossOrigin="anonymous" />
             <PublicCourse/>
        </>
    )
}