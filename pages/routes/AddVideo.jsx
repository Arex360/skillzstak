import { useEffect, useState } from "react";
import CustomNavBar from "../../components/Navbar";
import { CustomInput} from "../../components/Input";
import { Upload } from "../../components/Upload";
import {getBalance, loadWeb3} from '../../web3/web3Service'
import { getContract } from "../../web3/smartContract";
import Select from '../../components/Mantine/Select'
import dynamic from 'next/dynamic'
import {Tabs,Button} from '@mantine/core'
import { Photo, MessageCircle, Settings, World} from 'tabler-icons-react'
import {FaGoogleDrive,FaMicrosoft,FaDropbox} from 'react-icons/fa'
import useDrivePicker from 'react-google-drive-picker'
import DropBox from "../DropBox";
import ReactPlayer from "react-player";
import md5 from "md5";

export default function AddVideo(){
    
    let [signedIn,isSignedIn] = useState(false)
    let [account, setAccount] = useState('')
    let [profileRegistered,setProfileRegistered] = useState(false)
    let [profileLayout,setProfileLayout] = useState(false)
    let [courses,setCourses] = useState([])
    let [videoURL,setVideoURL] = useState('')
    let [courseHash,setCourseHash] = useState('')
    let [videoHash,setVideoHash] = useState('')
    let [videoPrice,setVideoPrice] = useState('')
    const [openPicker, driveData, authResponse] = useDrivePicker();  
    const [url,setURL] = useState('')
    const handleOpenPicker = () => {
        openPicker({
          clientId: "974535601936-1g54fdrgnenb0sejfssa7gtrqga2he9n.apps.googleusercontent.com",
          developerKey: "AIzaSyAtTpGGAg1G8f6D0FFpBj0Co9OZwLwhHYM",
          viewId: "DOCS",
          // token: token, // pass oauth token in case you already have one
          showUploadView: true,
          showUploadFolders: true,
          supportDrives: true,
          multiselect: true,
          customScopes: ['https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/drive.readonly','https://www.googleapis.com/auth/drive.photos.readonly'],
          appId:'testapp-345811 ',
          
          
          
          // customViews: customViewsArray, // custom view
        })
      }
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
      // let isRegisted = await contract.getProfile().call({from: localStorage.getItem('account)})
        setProfileRegistered(isRegisterd)
        if(isRegisterd){
            let profileDetails = await contract.getProfile().call({from:localStorage.getItem('account')})
            let temp = data
            temp.username = profileDetails.name
            setData(temp)
            console.log(profileDetails)
            getCoursesHash()
        }
        setAccount(account)
        isSignedIn(true)
    }
    let Data = async()=>{
        let contract = await getContract()
        let isRegisterd = await contract.amIRegistered().call({from: '0x4dcdce9d624ccf4c26a5aa9ff024d877519f0cf1'})
    }
    let register = async ()=>{
        let contract = await getContract()
        await contract.registerProfile(data.username,data.nationality,data.email,"ss",false,false).send({
            from: localStorage.getItem('account')
        })
    }
    let DropBoxHandler = files=>{
        let video = files[0]
        console.log(video)
        let link = video.link
        link = link.split('https://www.dropbox.com/s/')
        link = link[1]
        link = "https://dl.dropboxusercontent.com/s/"+link
        setVideoURL(link)

    }
    let getCoursesHash = async ()=>{
        let contract = await getContract()
        let myUploadedCourses = await contract.getMyUploadedCourses().call({from:localStorage.getItem('account')})
        let _data = []
        myUploadedCourses.forEach(data=>{
            console.log(data.hash)
            console.log(data.desc)
            _data.push({
                value: data.hash,
                label: data.desc
            })
        })
        setCourses(_data)
    }
    let uploadVideo = async ()=>{
        let contract = await getContract()
       console.log("Uplaoded video + "+courseHash)
       alert('sss')
        await contract.addVideo(videoHash,courseHash,md5(videoHash),videoURL,parseInt(videoPrice)).send({from:localStorage.getItem('account')})
        alert("Video uploaded "+ md5(videoHash))
    }
    useEffect(()=>{
        if(driveData){
            console.log(driveData.docs[0])
            if(!driveData.docs[0].isShared){
                window.open(driveData.docs[0].url)
            }
            setVideoURL(`https://www.googleapis.com/drive/v3/files/${driveData.docs[0].id}?alt=media&key=AIzaSyAtTpGGAg1G8f6D0FFpBj0Co9OZwLwhHYM`)
             driveData.docs.map(i => console.log(i.name))
           }
        let out = localStorage.getItem("isLoggedIn")
        if(localStorage.getItem("isLoggedIn") == 'true'){
            load()
        }
       
    },[driveData])
    if(profileRegistered){
        return(
            <>
                <CustomNavBar account={account} loggedIn={signedIn}/>
                <br />
                <br />
                <br />
                <br />
                <div className="flex w-100 h-[90vh]">
                    <div className="left w-1/2 h-full">
                        <div className="body w-3/4 mx-auto flex flex-col gap-3">
                            <br />
                            <br />
                            <br />
                            <CustomInput onChange={e=>setVideoHash(e.target.value)} placeHolder={"Enter Video Title"} label={"Video Title"}/>
                            <CustomInput onChange={e=>setVideoPrice(e.target.value)} placeHolder={"Enter Video Price (SKZ token)"} label={"Video Price"}/>
                            <>
                                 <label htmlFor="">Select Course</label>
                                 <Select  data={courses} defaultValue={{value:"react",label:"ss"}} onChange={hash=>setCourseHash(hash)}/>
                            </>
                            <br />
                            <hr />
                            <h1>Select Storage Provider</h1>
                             <Tabs>
                             <Tabs.Tab label="Web3" icon={<World size={14} />}>The filecoin gateways are under heavy pressure right now</Tabs.Tab>
                                    <Tabs.Tab label="DropBox" icon={<FaDropbox size={14} />}>
                                     <br />
                                     <DropBox onUploaded={DropBoxHandler}/>
                                    </Tabs.Tab>
                                    <Tabs.Tab label="GoogleDrive" icon={<FaGoogleDrive size={14} />}>
                                    <br />
                                     <div onClick={()=>handleOpenPicker()} className="dropbox-button flex h-24 items-center gap-6 shadow-lg">
                                         <img src="https://imgur.com/wIUk9rf.png" className='h-full scale-75' width={100} height={100}/>
                                                 Upload On Google Drive   
                                     </div>    
                                     </Tabs.Tab>
                             </Tabs>
                             <br />
                             <br />
                             <hr />
                             <Button className="bg-blue-600" onClick={()=>uploadVideo()}>Upload Course</Button>
                        </div>
                    </div>
                    <div className="right flex-auto h-full text-white bg-gray-900 rounded-tl-[20%] opacity-100 relative overflow-hidden flex justify-center items-center">
                        {false && <ReactPlayer  url={videoURL} controls={true} />}
                        
                    </div>
                </div>
            </>
        )
    }else{
        return(
            <>
            <CustomNavBar account={account} loggedIn={signedIn}/>
            {!profileLayout &&<div className="w-full h-screen flex flex-col gap-3 justify-center items-center bg-gray-100">
                <div className="image w-32 md:w-72">
                     <img src={"https://imgur.com/7IPr0F4.png"} alt="" />
                </div>
                <h1 className="text-4xl">{"Profile Doesn't Exist"}</h1>
                <p className="opacity-70 text-sm">Ops Its Seems like you have not signed up for the profile yet</p>
                <button onClick={()=>setProfileLayout(true)} className="bg-blue-600 px-8 py-3 rounded text-white hover:px-20 duration-500">Set Up Profile</button>
            </div>}
            {profileLayout &&<div className="w-full h-screen flex flex-col gap-3 justify-center items-center bg-gray-100">
                <div className="shadow-2xl p-12 bg-gray-2    00 form w-1/3 flex flex-col gap-2">
                    <CustomInput placeHolder={"Enter Name"} label="Enter Name" onChange={e=> handleChange(e,'username')}/>
                    <CustomInput placeHolder={"E.g PK , US"} label="Enter Nationality" onChange={e=>handleChange(e,'nationality')}/>
                    <CustomInput placeHolder={"E.g john.doe@email.com"} label="Enter Email" onChange={e=>handleChange(e,'email')}/>
                    <Upload title="Upload Profile Picture"/>
                    <div className="mt-4  check flex items-center">
                         <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"/>  
                         <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                         Mark the profile private
                     </label>
                    </div>
                    <div className="mt-4  check flex items-center">
                         <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"/>  
                         <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                         Allow login through email
                     </label>
                    </div>
                    <button className="text-white bg-blue-600 py-2" onClick={()=> videoUpload()}>Submit Profile</button>
                </div>

            </div>}
            </>
        )
    }
}