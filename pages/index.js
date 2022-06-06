import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomePage from './routes/Home'
import Script from 'next/script'

export default function Home() {
  return (
    <div>
   <Script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.3/web3.min.js" crossOrigin="anonymous" />
       
       <HomePage/>
    </div>
  )
}
