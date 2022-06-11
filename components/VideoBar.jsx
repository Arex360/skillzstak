import Image from "next/image";
import { getContract } from "../web3/smartContract";
import { toEth } from "../web3/web3Service";

export default function VideoBar({courseHash,title,isPurshaed,price,onClick,hash,purchaseVideo}){
    let allowClick = ()=>{
        if(isPurshaed){
            onClick()
        }else{
            return
        }
    }
    let purchaseVideoOfCourse = async ()=>{
        let contract = await getContract()
        await contract.purchaseVideo(hash).send({from:localStorage.getItem('account') })
        window.location.reload()
    }
    let fetchVideo =  async () =>{
        let contract = await getContract()
        let course = await contract.getVideo(hash).call({from: localStorage.getItem('account')})
        console.table(course)
        localStorage.setItem(courseHash,course.videoUrl)
        alert(hash)
        window.location.reload()
    }
    return(
        <>
        <div  onClick={allowClick} className="videoBar flex justify-between px-20 items-center w-full h-12 bg-gray-900 shadow-2xl">
            <div className="left flex gap-2 items-center text-white">
                <div className="icon w-7 ">
                    <img className="w-full h-full" src="https://imgur.com/cxXFjD7.png"/>
                </div>
                <label htmlFor="">{title}</label>
            </div>
            <div className="right">
                {!isPurshaed &&<button onClick={purchaseVideoOfCourse} className="bg-green-500 px-7 py-2 rounded-lg text-white font-bold">{toEth(price) + " SKZ"}</button>}
                {isPurshaed  &&<button onClick={fetchVideo} className="bg-green-500 px-7 py-2 rounded-lg text-white font-bold">Play</button>}
            </div>
        </div>
        </>
    )
}