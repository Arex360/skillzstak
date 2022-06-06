//import Web3 from 'web3'
import loadScript from 'load-script'
//let url = 'https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.3/web3.min.js'
//let url = 'http://localhost:5000/'
function loadLibrary(){
   // loadScript(url)
    
}
function connectToWeb3(){
    return new Web3(Web3.givenProvider)
}
function toEth(eth){
    return (eth / Math.pow(10,18))
}
function toWei(eth){
    return (eth * Math.pow(10,18))
}
let loadWeb3 = async loadWeb3 => {
    //const Web3 = await loadScript(url)
    loadLibrary()
    const {ethereum} = window;
    console.log(ethereum ? 'ethereum exits': 'etherum does not exist')
    if(ethereum){
        const account = await ethereum.request({method:'eth_requestAccounts'})
        localStorage.setItem('isLoggedIn',true)
        localStorage.setItem("account",account[0])
        return account
    }
}
let getBalance = async (account)=>{
    loadLibrary()
    if(localStorage.getItem('account')){
        const web3 = new Web3(Web3.givenProvider);
        var balance = await web3.eth.getBalance(localStorage.getItem('account')); //Will give value in.
        var ammount = toEth(balance)
        return ammount
    }
}
let getWeb3Instance = ()=>{
    loadLibrary()
    const web3 = new Web3(Web3.givenProvider);
    return web3
}
export {
    connectToWeb3,
    toEth,
    loadWeb3,
    getBalance,
    getWeb3Instance,
    toWei,
    loadLibrary
}