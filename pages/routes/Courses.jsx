import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../../components/Navbar'))
import {useEffect,useState} from 'react'
import {getBalance, loadWeb3} from '../../web3/web3Service'
import { getContract } from "../../web3/smartContract";
export default function Courses(){
    let [signedIn,isSignedIn] = useState(false)
    let [account, setAccount] = useState('')
    let [profileRegistered,setProfileRegistered] = useState(false)
    let [profileLayout,setProfileLayout] = useState(false)



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
        }
        setAccount(account)
        isSignedIn(true)
    }
    let Data = async()=>{
        let contract = await getContract()
        let isRegisterd = await contract.amIRegistered().call({from: localStorage.getItem('account')})
    }
    let register = async ()=>{
        let contract = await getContract()
        await contract.registerProfile(data.username,data.nationality,data.email,"ss",false,false).send({
            from: localStorage.getItem('account')
        })
    }
    useEffect(()=>{
        let out = localStorage.getItem("isLoggedIn")
        if(localStorage.getItem("isLoggedIn") == 'true'){
            load()
            console.log(account)
        }
       
    },[])
    return(
        <>
             <Navbar account={account} loggedIn={signedIn}/>
        </>
    )
}