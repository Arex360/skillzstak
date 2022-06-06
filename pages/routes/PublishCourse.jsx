import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../../components/Navbar'))
const RTE = dynamic(() => import('../../components/Mantine/RTE'),{ssr:false})
import {useEffect,useState} from 'react'
import {getBalance, loadWeb3} from '../../web3/web3Service'
import { getContract } from "../../web3/smartContract";
import { CustomInput } from '../../components/Input';
import {Editor} from '@tinymce/tinymce-react'
//const Editor =  dynamic(() => import('../../components/Editor'))
import renderHTML from 'react-render-html';
const ReactQuill = dynamic(() => import('react-quill'),{ssr:false})
const Button = dynamic(() => import('../../components/Mantine/Button'))
import Block from '../../components/ImageUploader'
import 'react-quill/dist/quill.snow.css';
import { Upload } from '../../components/Upload'
import md5 from 'md5'
import axios from 'axios'
export default function Publish(){
    let [signedIn,isSignedIn] = useState(false)
    let [account, setAccount] = useState('')
    let [profileRegistered,setProfileRegistered] = useState(false)
    let [profileLayout,setProfileLayout] = useState(false)
    let [out,setOut] = useState('')
    let [url,setURL] = useState('')
    let [desc,setDesc] = useState('')
    let [pageURL,setPageURL] = useState('')
    let [price,setPrice] = useState(0)
    let [data,setData] = useState({
        username: '',
        nationality: '',
        email:'',
        profile:'ss',
        private: false,
        email: false,
        title: '',
        price: ''
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
        let isRegisterd = await contract.amIRegistered().call({from: '0x4dcdce9d624ccf4c26a5aa9ff024d877519f0cf1'})
    }
    let register = async ()=>{
        let contract = await getContract()
        await contract.registerProfile(data.username,data.nationality,data.email,"ss",false,false).send({
            from: localStorage.getItem('account')
        })
    }
    const textToHtml = (text) => {
        const elem = document.createElement('div');
        return text.split(/\n\n+/).map((paragraph) => {
          return '<p>' + paragraph.split(/\n+/).map((line) => {
            elem.textContent = line;
            return elem.innerHTML;
          }).join('<br/>') + '</p>';
        }).join('');
      }
      const registerCourse = async ()=>{
          alert('ss')
          let title = data.title
          let disc = desc
          const res = await  axios.post('/api/upload',{
              data: webTemplate(localStorage.getItem('img'),title,disc)
          })
         const {url} = res.data
         alert (url)
         setPageURL(url)
         let hash = md5(data.title)
         let contract = await getContract()
         alert(data.price)
         await contract.addCourse(data.title,localStorage.getItem('img'),data.price,hash,true,true,url).send({
            from: localStorage.getItem('account')
        })
        alert(hash)
      }
    const webTemplate = (img,title,desc)=>{
        return `
                
                <style>
                    .img{
                        width: 100px;
                        height: 100px;
                    }
                    .row{
                        margin-left: 5%;
                        display: flex;
                        gap: 10px;
                        font-size: 3rem;
                        align-items: center;
                    }
                    #desc{
                        padding-left: 5%;
                        padding-right: 5%;
                        text-align: center;
                    }
                    .img img{
                        width: 100%;
                        height: 100%;
                    }
                </style>
                <div class="box">
                    <div class="row">
                        <div class="img">
                            <img src="${url}" alt="">
                        </div>
                        <h1>${title}</h1>
                    </div>
                    <br>
                    <hr>
                    <p id="desc">${desc}</p>
                </div>
    
        `
    }
    useEffect(()=>{
        let ql = document.querySelector('.ql-toolbar')
        let out = localStorage.getItem("isLoggedIn")
        if(localStorage.getItem("isLoggedIn") == 'true'){
            load()
            console.log(account)
        }
       
    },[])
    return(
        <>
             <Navbar account={account} loggedIn={signedIn}/>
              <div className="page w-full top-24 h-[90vh] relative flex flex-row">
                  <div className="w-1/2 h-full bg-gray-800 rounded-tl-[300px] rounded-br-[300px] relative">
                    <div className="bar w-32 h-7 bg-white float-right font-bold rounded-3xl mt-7 mr-10 flex justify-evenly items-center">
                        <label htmlFor="">Preview</label>
                        <div className="circle w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="preview w-[80%] h-[50%] rounded-md bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        {renderHTML(webTemplate('ss',data.title,desc))}
                    </div>
                  </div>
                  <div className="right flex-auto h-full flex justify-center flex-col gap-5">
                      <div className="form w-[90%] mx-auto flex justify-center flex-col gap-5">
                          <div className="innerflex flex items-center">
                            <div className="upload w-[40%] mr-5">
                            <Block></Block>
                             {false &&<Upload onChange={e=>alert(e)} title="Upload Course Thumbnail"/>}
                             
                            </div>
                            <div className="inputs flex-col flex gap-5 flex-auto">
                                <br />
                                <CustomInput onChange={e=>handleChange(e,'title')} label={"Enter Course Title"} placeHolder={"Enter Course Title"}/>
                                <CustomInput onChange={e=>{
                                    let temp = data
                                    data['price'] = parseInt( e.target.value) 
                                    setData(temp)
                                }} label={"Enter Course Price"} placeHolder={"Enter Course Price"}/>
                            </div>
                          </div>
                      </div>
                      <hr />
                      <div className="desc w-[90%] mx-auto">
                    <label htmlFor="" className='font-bold'>Enter Course Description</label>
                       <Editor
                          apiKey='oyd62k7pg2r28csz00cidu8k9zsuzkw9kpyqigek6yvs92vk'
                         plugins= 'advlist autolink lists link image charmap preview anchor pagebreak'
                         onChange={e=>{
                            setURL(localStorage.getItem('img'))
                            setDesc(e.target.getContent())
                            }}
                       />
                       <button onClick={registerCourse} className='bg-slate-800 px-[10%] text-white py-[1%] mt-2 rounded-lg hover:px-[45%] transition duration-700 float-right'>Publish Course</button>
                      </div>
                  </div>
              </div>
        </>
    )
}