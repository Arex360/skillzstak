import { getWeb3Instance } from "./web3Service"
import {loadLibrary} from './web3Service'
import abi from './abi.json'
let getContract = async()=>{
    loadLibrary()
    let web = await getWeb3Instance()
    let Contract = new web.eth.Contract(abi,'0x4D8B4d81DbEDa9F8213AF353068A9dd5Ab7e2627')
    return Contract.methods
}
let getCourses = async()=>{
    loadLibrary()
    let courses = []
    let contract = await getContract()
    return courses
}
export{
    getContract,
    getCourses
}