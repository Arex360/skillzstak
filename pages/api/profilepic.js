import fs from 'fs'
import base64Img from 'base64-img'
export default async function handler(req, res) {
    const {account,image,filename} = req.body
    let path = __dirname
    path = path.split('\\.next\\server\\')
    console.log(path)
    path = path[0] + '\\'+ path[1] +`\\images\\${account+filename}`
    console.log(path)/*
    fs.writeFile(path,image,{encoding:'base64'},(err)=>{
      if(err){
        console.log(err)
      }else{
        console.log('done')
      }
    })*/
    path = base64Img.imgSync(image,path)
    console.log(path)
    res.status(200).json({ url: `${account+filename}` })
  }
  