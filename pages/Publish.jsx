import dynamic from 'next/dynamic'
import Script from 'next/script'
import Head from 'next/head'
const Publish = dynamic(() => import('./routes/PublishCourse'))
export default function PublishPage(){
    return(
        <div className="page w-[100%]">
            <Script defer={true} src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.3/web3.min.js" crossOrigin="anonymous" />
  
            <Publish/>
        </div>
    )
}
