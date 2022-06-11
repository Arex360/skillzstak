import { useEffect, useState } from "react";
import CustomNavBar from "../../components/Navbar";
import { CustomInput} from "../../components/Input";
import { Upload } from "../../components/Upload";
import {getBalance, loadWeb3, toEth, toWei} from '../../web3/web3Service'
import { getContract } from "../../web3/smartContract";
import Card from '../../components/Card'
import axios from "axios";
export default function PublicCoursePage(){
    
    let [signedIn,isSignedIn] = useState(false)
    let [account, setAccount] = useState('')
    let [profileRegistered,setProfileRegistered] = useState(false)
    let [profileLayout,setProfileLayout] = useState(false)
    let [Cards,setCards] = useState([])
    let [purchasedCards,setPurchasedCards] = useState([])
    let [ProfileURL,setProfileURL] = useState('')
    let [imageUploaded,setUploadedImage] = useState(false)
    let [currentAmount,setCurrentAmount] = useState(0)
    let [targetAddress,setTargetAddress] = useState('')
    let [targetAmmount,setTargetAmmount] = useState(0)
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
            let url = profileDetails.profilePicture
            console.log(url)
            document.querySelector("#profile").src = url;
            setProfileURL(url)
            setData(temp)
            setProfileURL(profileDetails.ProfilePicture)
            console.log(profileDetails)
            getMyCourses()
            getPurchasedCourses()
            getBalence()
        }
        setAccount(account)
        isSignedIn(true)
    }
    let Data = async()=>{
        let contract = await getContract()
        let isRegisterd = await contract.amIRegistered().call({from: localStorage.getItem('account')})
        alert(isRegisterd)
    }
    let register = async ()=>{
        let contract = await getContract()
        await contract.registerProfile(data.username,data.nationality,data.email,ProfileURL,false,false).send({
            from: localStorage.getItem('account')
        })
        window.location.reload()
    }
    let getBalence = async ()=>{
        let contract = await getContract()
        let balance = await contract.getMyBalance().call({from:localStorage.getItem('account') })
        balance = toEth(balance)
        setCurrentAmount(balance)
    }
    let getMyCourses = async ()=>{
        let contract = await getContract()
        let myCourses = await contract.getAllPublicCourses().call({from: localStorage.getItem('account')})
        let temp = []
        myCourses.forEach((course,i)=>{
            console.log(course)
            temp.push(<Card key={i} onClick={()=>window.location.replace(`/Course?cid=${course.hash}`)}  img={course.thumbnail} title={course.desc} className="w-32 p-4 bg-gray-200 shadow-md" />)
            setCards(temp)
        })
    }
    let getPurchasedCourses = async ()=>{
        let contract = await getContract()
        let _purchasedCourses = await contract.getMyPurchasedCourses().call({from:localStorage.getItem('account')})
        let temp = []
        _purchasedCourses.forEach((course,id)=>{
            console.log("My purchased course")
            temp.push(<Card key={id} onClick={()=>window.location.replace(`/Course?cid=${course.hash}`)}  img={course.thumbnail} title={course.desc} className="w-32 p-4 bg-gray-200 shadow-md" />)
            setPurchasedCards(temp)
        })
    }
    let uploadImage = e=>{
        let file = e.target.files[0]
        console.log(file.name)

        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            axios.post('/api/profilepic',{
                image: reader.result,
                account: localStorage.getItem('account'),
                filename: file.name
            }).then(e=>{
                console.log(e.data.url)
                setProfileURL('/api/sendImage?image='+e.data.url)
                setUploadedImage(true)
                console.log('/api/sendImage?image='+e.data.url)
            })
        }
    }
    let transferFunds = async ()=>{
        let contract = await getContract()
        let amount = BigInt(toWei(targetAmmount)).toString()
        let isTransferred = await contract.transfer(targetAddress,amount).send({from:localStorage.getItem('account')})
        alert(isTransferred)
    }
    useEffect(()=>{
        let out = localStorage.getItem("isLoggedIn")
        if(localStorage.getItem("isLoggedIn") == 'true'){
            load()
        }
       
    },[])
    if(profileRegistered){
        return(
            <>
            <CustomNavBar account={account} loggedIn={signedIn}/>
            <div className="bar flex w-full h-screen">
                <div className="items-center gap-2 text-white left w-1/6 h-screen bg-slate-900 flex flex-col ">
                    <div className="box w-48 h-48 mx-auto bg-white mt-32">
                        <img id="profile" className="w-full h-full" src={ProfileURL} alt="" />
                    </div>
                    <h1>{data.username}</h1>
                    <br />
                    <hr />
                    <label htmlFor="">Balence: {parseInt(currentAmount)}</label>
                    <hr />
                    <div className="transfer flex justify-around">
                        <div className="left w-2/4">
                            <CustomInput onChange={e=>setTargetAddress(e.target.value)} label={"Target"} placeHolder={"Enter Recepient Address"}/>
                        </div>
                        <div className="right w-1/3">
                            <CustomInput onChange={e=>setTargetAmmount(parseInt(e.target.value))} label={"Ammount"} placeHolder={"Enter Token Ammount"}/>
                        </div>
                    </div>
                    <button onClick={transferFunds} className="bg-orange-400 mt-5 px-6 py-2 rounded-lg">Transfer SKZ</button>
                </div>
                <div className="right flex flex-col items-center flex-auto h-screen px-10">
                    <div className="bar gap-2 mt-28 w-full h-16 bg-slate-700 text-white items-center flex px-10">
                        <div className="grid grid-cols-3 gap-1">  
                            <div className="box w-1 h-1 bg-white"></div>
                            <div className="box w-1 h-1 bg-white"></div>
                            <div className="box w-1 h-1 bg-white"></div>
                            <div className="box w-1 h-1 bg-white"></div>
                            <div className="box w-1 h-1 bg-white"></div>
                            <div className="box w-1 h-1 bg-white"></div>
                            <div className="box w-1 h-1 bg-white"></div>
                            <div className="box w-1 h-1 bg-white"></div>
                            <div className="box w-1 h-1 bg-white"></div>
                        </div>
                        <label htmlFor="">Public Courses</label>
                    </div>
                    <br />
                    <br />
                    <div className="cards grid grid-cols-8 w-full items-center gap-5">
                        {Cards}
                    </div>
                    <div className="gr w-full">
                    </div>
                   
                    
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
                <div className="shadow-2xl p-12 bg-gray-2    00 form w-1/3 flex flex-col gap-2 relative">
                    
                    <CustomInput placeHolder={"Enter Name"} label="Enter Name" onChange={e=> handleChange(e,'username')}/>
                    <CustomInput placeHolder={"E.g PK , US"} label="Enter Nationality" onChange={e=>handleChange(e,'nationality')}/>
                    <CustomInput placeHolder={"E.g john.doe@email.com"} label="Enter Email" onChange={e=>handleChange(e,'email')}/>
                    {!imageUploaded && <Upload title="Upload Profile Picture" onChange={uploadImage}/>}
                    {imageUploaded && <div className="image w-32 h-32 relative">
                        <img src={ProfileURL} className='w-full h-full' alt="" />
                        <div onClick={()=>setUploadedImage(false)} className="cicle rounded-full w-6 h-6 absolute top-0 right-0 text-white cursor-pointer hover:cursor-pointer bg-red-600 flex items-center justify-center">
                            <label htmlFor="">x</label>
                        </div>
                    </div>}
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
                    <button className="text-white bg-blue-600 py-2" onClick={()=> register()}>Submit Profile</button>
                </div>

            </div>}
            </>
        )
    }
}