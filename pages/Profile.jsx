import  ProfilePage  from "./routes/ProfilePage"
import Script from 'next/script'

let Profile = ()=>{
    return (
        <>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.3/web3.min.js" crossOrigin="anonymous" />
        <ProfilePage/>
        </>
    )
}
export default Profile