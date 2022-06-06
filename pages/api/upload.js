import fs from 'fs'
import {uplaodText, uploadFile} from 'ipfs-minifile'
import {AbortController} from 'node-abort-controller'
global.AbortController = AbortController
export default async function handler(req, res) {
    let {data} = req.body
    let {url} = await uplaodText(data)
    url = url.split('/')
    url = url[4]
    res.status(200).json({url: url})
  }
  