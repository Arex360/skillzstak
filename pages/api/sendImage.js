// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'
export default function handler(req, res) {
    res.setHeader('Content-Type', 'image/jpg')
    const { image } = req.query
    let path = __dirname
    path = path.split('\\.next\\server\\')
    console.log(path)
    path = path[0] + '\\'+ path[1] +`\\images\\${image}\\undefined.png`
    let buffer = fs.readFileSync(path)
    res.send(buffer)
  }
  