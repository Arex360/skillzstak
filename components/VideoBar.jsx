import Image from "next/image";
import { toEth } from "../web3/web3Service";

export default function VideoBar({title,isPurshaed,price,onClick,purchaseVideo}){
    let allowClick = ()=>{
        if(isPurshaed){
            onClick()
        }else{
            return
        }
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
                {!isPurshaed &&<button onClick={purchaseVideo} className="bg-green-500 px-7 py-2 rounded-lg text-white font-bold">{toEth(price) + " SKZ"}</button>}
                {isPurshaed  &&<button  className="bg-green-500 px-7 py-2 rounded-lg text-white font-bold">Purchased</button>}
            </div>
        </div>
        </>
    )
}