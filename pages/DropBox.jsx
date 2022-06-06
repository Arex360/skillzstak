import DropboxChooser from './Drop'
import Image from 'next/image'
let DropBox = ({onUploaded})=>{
    return(
        <DropboxChooser 
            appKey={'38ou9k7lr7wmhzg'}
            success={onUploaded? onUploaded: (files)=>{console.log(files)}}
            cancel={() => console.log('hello')}
            multiselect={true}
            extensions={['.mp4']} >
            <div className="dropbox-button flex h-24 items-center gap-6 shadow-lg">
                <img src="https://imgur.com/eQyZdth.png" className='h-full scale-75' width={100} height={100}/>
                Upload On Dropbox    
            </div>        
        </DropboxChooser>
    )
}
export default DropBox