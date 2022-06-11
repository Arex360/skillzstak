import axios from 'axios'
import { useEffect, useState } from "react";
import CustomNavBar from "../../components/Navbar";
import { CustomInput} from "../../components/Input";
import { Upload } from "../../components/Upload";
import {getBalance, loadWeb3, toEth} from '../../web3/web3Service'
import { getContract } from "../../web3/smartContract";
import VideoBar from '../../components/VideoBar'
export default function CoursePage({cid}){
    let [signedIn,isSignedIn] = useState(false)
    let [account, setAccount] = useState('')
    let [profileRegistered,setProfileRegistered] = useState(false)
    let [profileLayout,setProfileLayout] = useState(false)
    let [Cards,setCards] = useState([])
    let [Videos,setVideos] = useState([])
    let [selectedVideo,setSelectedVideo] = useState('')
    let [isSubscribed,setIsSubscribed] = useState(false)
    let [coursePrice,setCoursePrice] = useState(0)
    let [data,setData] = useState({
        username: '',
        nationality: '',
        email:'',
        profile:'ss',
        private: false,
        email: false
    })
    let handleChange = (e,k)=>{
        let temp = data
        data[k] = e.target.value 
        setData(temp)
    }
    let [balance,setBalance] = useState('')
    let load = async()=>{
        let account = await loadWeb3()
        let balance = await getBalance(account)
        let contract = await getContract()
        let isRegisterd = await contract.amIRegistered().call({from: localStorage.getItem('account')})
        //alert(isRegisterd)
      // let isRegisted = await contract.getProfile().call({from: localStorage.getItem('account)})
        setProfileRegistered(isRegisterd)
        if(isRegisterd){
            let profileDetails = await contract.getProfile().call({from:localStorage.getItem('account')})
            let temp = data
            temp.username = profileDetails.name
            setData(temp)
            console.log(profileDetails)
            getCourseDetail()
        }
        setAccount(account)
        isSignedIn(true)
    }
    let Data = async()=>{
        let contract = await getContract()
        let isRegisterd = await contract.amIRegistered().call({from: '0x4dcdce9d624ccf4c26a5aa9ff024d877519f0cf1'})
        alert(isRegisterd)
    }
    let register = async ()=>{
        let contract = await getContract()
        await contract.registerProfile(data.username,data.nationality,data.email,"ss",false,false).send({
            from: localStorage.getItem('account')
        })
    }
    let fetchVideo =  async (hash) =>{
        /*let contract = await getContract()
        let course = await contract.getVideo(hash).call({from: localStorage.getItem('account')})
        console.table(course)
        setSelectedVideo(course.videoUrl)*/
    }
    let purchaseVideo = async (hash)=>{
        let contract = await getContract()
        await contract.purchaseVideo(hash).send({from:localStorage.getItem('account') })
        window.location.reload()
    }
    let isCourseSubscribed = async(hash)=>{
        let contract = await getContract()
        let subscribed =  await contract.isCourseSubscrived(hash).call({from:localStorage.getItem('account')})
        setIsSubscribed(subscribed)
        if(!subscribed){
            let _courePrice = await contract.getCoursePrice(hash).call({from:localStorage.getItem('account')})
            _courePrice = toEth(_courePrice)
            setCoursePrice(_courePrice)
        }
    }
    let purchaseCourse = async ()=>{
        let contract = await getContract()
        await contract.BuyCourse(cid).send({from:localStorage.getItem('account')})
        window.location.reload()
    }
    let getCourseDetail = async ()=>{
        let contract = await getContract()
        let course = await contract.getCourseByHash(cid).call({from: localStorage.getItem('account')})
        let videosList = await contract.getVideoListFromTheCourse(cid).call({from: localStorage.getItem('account')})
        console.log(course)

        let data = []
        for(let i = 0 ; i <videosList.length;i++){
            let hash = videosList[i]
            let video = await contract.getVideoTitle(hash).call({from:localStorage.getItem('account')})
            console.log('video '+hash)
            data.push(<VideoBar courseHash={cid} hash={hash} key={'a'+i} purchaseVideo={()=>purchaseVideo(hash)}  onClick={()=>fetchVideo(hash)} title={video.title} isPurshaed={video.purchased} price={video.price}/>)
        }
        setVideos(data)
        
        axios.get(`https://ipfs.io/ipfs/${course.Desc}`).then(res=>{
            const body = document.querySelector('.details')
            body.innerHTML = res.data
        })
    }
    useEffect(()=>{
        /*
        axios.get(`https://ipfs.io/ipfs/${cid}`).then(res=>{
            const body = document.querySelector('.details')
            body.innerHTML = res.data
        })
        */
        if(localStorage.getItem("isLoggedIn") == 'true'){
            load()
            isCourseSubscribed(cid)
            setSelectedVideo(localStorage.getItem(cid))
        }
    },[cid])
    return(
        <>
          <CustomNavBar account={account} loggedIn={signedIn}/>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="details">

          </div>
          <br />
          <br />
          <div className="videoContainer w-2/3 h-[60vh] bg-gray-800 mx-auto relative">
              <div className="videoSection w-full h-[50%] ">
                  <video src={selectedVideo} className='w-full h-full' controls></video>
              </div>
              {isSubscribed && <div className="list w-full h-[50%] px-5 flex flex-col gap-3 overflow-y-scroll">
                  <br />
                  {Videos}
              </div>}
              {!isSubscribed &&<div className="list w-full h-[50%] px-5 flex flex-col gap-3 overflow-y-scroll">
                  <br />
                  <button onClick={purchaseCourse} className='bg-yellow-500 w-1/3 h-10 rounded-lg text-white font-bold mx-auto'>Subscribe {coursePrice} SKZ</button>
              </div>}
          </div>
        </>
    )
}