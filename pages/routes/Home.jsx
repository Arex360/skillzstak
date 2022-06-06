
import { useEffect, useState } from "react"
import {getBalance, loadWeb3} from '../../web3/web3Service'
import dynamic from 'next/dynamic'
const HeroContentLeft = dynamic(() => import('../../components/Hero'))
const HeroBullets = dynamic(() => import('../Sections/WhyUs'))
const FeaturesTitle = dynamic(() => import('../Sections/Features'))
const CustomNavBar = dynamic(() => import('../../components/Navbar'))
//const getBalance = dynamic(() => import('../../web3/Services/getBalance'))
//const loadWeb3 = dynamic(()=>import('../../web3/Services/loadWeb3'))
let HomePage = ()=>{
    let [signedIn,isSignedIn] = useState(false)
    let [account, setAccount] = useState('')
    let [balance,setBalance] = useState('')
    let load = async()=>{
        let account = await loadWeb3()
        let balance = await getBalance(account)
        setAccount(account)
        isSignedIn(true)
    }
    useEffect(()=>{
        let out = localStorage.getItem("isLoggedIn")
        if(localStorage.getItem("isLoggedIn") == 'true'){
            load()
        }
        
    },[])
    let loginWithMetaMask = ()=>{
        load()
    }
    let logout = ()=>{
        localStorage.setItem("isLoggedIn",false);
        window.location.reload()
    }
    return (
        <div className="card w-full">
            <CustomNavBar logout={logout} LoginwithMetaMask={loginWithMetaMask} loggedIn={signedIn} account={account}/>
            <HeroContentLeft loggedIn={signedIn} />
            <HeroBullets/>
            <div className="features w-3/4 mx-auto">
                <FeaturesTitle/>
            </div>
        </div>
    )
}
export default HomePage