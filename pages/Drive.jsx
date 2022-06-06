import  { useEffect,useState } from 'react';
import useDrivePicker from 'react-google-drive-picker'


function Drive() {
  const [openPicker, data, authResponse] = useDrivePicker();  
  const [url,setURL] = useState('')
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "974535601936-1g54fdrgnenb0sejfssa7gtrqga2he9n.apps.googleusercontent.com",
      developerKey: "AIzaSyAtTpGGAg1G8f6D0FFpBj0Co9OZwLwhHYM",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      customScopes: ['https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/drive.readonly','https://www.googleapis.com/auth/drive.photos.readonly'],
      appId:'testapp-345811 ',
      
      
      // customViews: customViewsArray, // custom view
    })
  }

  useEffect(() => {
    // do anything with the selected/uploaded files
    if(data){
     console.log(data.docs[0])
     setURL(`https://www.googleapis.com/drive/v3/files/${data.docs[0].id}?alt=media&key=AIzaSyAtTpGGAg1G8f6D0FFpBj0Co9OZwLwhHYM`)
      data.docs.map(i => console.log(i.name))
    }
  }, [data])

  
  return (
    <div>
        <video src={"https://docs.google.com/uc?export=download&id=1KHIun3qYA9l2YWQVLPc_b1HV9-Lg8r5b&revid=0BwjDS3rF19JuYTZqSTRWZnBwQVNVTzNnUldxSkk1aTZCWkhzPQ"} controls></video>
        <p>{url}</p>
        <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default Drive;