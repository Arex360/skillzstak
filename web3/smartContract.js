import { getWeb3Instance } from "./web3Service"
import {loadLibrary} from './web3Service'
import abi from './abi.json'
let getContract = async()=>{
    loadLibrary()
    let web = await getWeb3Instance()
    let Contract = new web.eth.Contract(abi,'0x021A34DEa2106ea7b3B689d42cF0aA20613DaE9D')
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