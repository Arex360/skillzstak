import CoursePage from "./routes/CoursePage";
import {useRouter} from 'next/router'
import { useEffect,useState } from "react";
export default function Course(){
    const {query} = useRouter();
    const [cid,setCid] = useState('')
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search)
        setCid(params.get('cid'))
        console.log(cid)
    },[query])
    return(
        <>
        <CoursePage cid={cid}/>
        </>
    )
}