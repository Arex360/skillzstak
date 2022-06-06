import React from 'react'
import {create } from 'ipfs-http-client';
import { Upload } from '../components/Upload';
class Block extends React.Component {
    constructor () {
      super()
      this.state = {
        fileuploaded: false,
        added_file_hash: null,
        percentage: 0,
        f: ''
      }
      this.ipfs = create('https://ipfs.infura.io:5001/api/v0')
      this.captureFile = this.captureFile.bind(this)
      this.saveToIpfs = this.saveToIpfs.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.filename = ''
    }
    captureFile (event) {
      event.stopPropagation()
      event.preventDefault()
      let total = event.target.files[0].size
      this.filename = event.target.files[0].name
      this.setState({
        f: total
      })
      console.log(total)
      this.saveToIpfs(event.target.files,total)
    }
    async saveToIpfs (files,totalsize) {
      const source = this.ipfs.addAll(
        [...files],
        {
          progress: (prog) => {
            prog = (prog / totalsize) * 100
            this.setState({
              percentage: Math.round(prog)
            })
            console.log(this.filename)
            console.log(`received: ${prog}`)
          }
        }
      )
      try {
        for await (const file of source) {
          console.log(file)
          this.setState({fileuploaded:true, added_file_hash: file.path +`?filename=${this.filename}`})
          localStorage.setItem('img','https://ipfs.io/ipfs/'+file.path +`?filename=${this.filename}`)
        }
      } catch (err) {
        console.error(err)
      }
    }
    async saveToIpfsWithFilename (files) {
      const file = [...files][0]
      const fileDetails = {
        path: file.name,
        content: file
      }
      const options = {
        wrapWithDirectory: true,
        progress: (prog) => console.log(`received: ${prog}`)
      }
  
      const source = this.ipfs.add(fileDetails, options)
      try {
        for await (const file of source) {
          console.log(file)
          this.setState({ added_file_hash: file.cid.toString() + `?filename=${this.filename}` })
          
        }
      } catch (err) {
        console.error(err)
      }
    }
  
    handleSubmit (event) {
      event.preventDefault()
    }
  
    render () {
      return (
        <div>
          <div>
          </div>
             {this.state.fileuploaded && <img style={{width:'100%', height:'100%'}} src={'https://ipfs.io/ipfs/'+this.state.added_file_hash} alt="" />}
             {!this.state.fileuploaded && <Upload onChange={this.captureFile} title="Upload Thumbnail"/>}
        
        </div>
      )
    }
  }
  export default Block