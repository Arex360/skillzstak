import DropDown from "./DropDown"
import ProfileDown from "./ProfileDown"

let CustomNavBar = ({LoginwithMetaMask,LoginWithEmail,loggedIn,account,logout})=>{
  return(
    <header className="bg-gray-800 text-white body-font fixed w-full z-10 shadow-2xl">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="hidden md:flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl text-white">Skillz Stack</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
     
    </nav>
    {!loggedIn && <DropDown LoginwithMetaMask={LoginwithMetaMask} LoginWithEmail={LoginWithEmail}/>}
    {loggedIn && <ProfileDown logOut={logout} account={account} LoginwithMetaMask={LoginwithMetaMask} LoginWithEmail={LoginWithEmail}/>}
  </div>
</header>
  )
}
export default CustomNavBar